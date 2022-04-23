import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'

const instance = axios.create({
  // baseURL: '',
  timeout: 6000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 设置 token
  const { user } = store.state
  if (user?.access_token) {
    config.headers.Authorization = user.access_token
  }

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * access_token：获取需要授权接口数据
 * expires_in：access_token 过期时间
 * refresh_token：刷新获取新的 access_token
 * 重新获取 token 的两种方式：
 *  1. 在请求发起前拦截每个请求，判断 token 的有效时间是否已经过期，若已经过期，则将请求挂起，先刷新 token 后再继续请求
 *    优点：在请求前拦截，能节省请求，省流量
 *    缺点：需要后端额外提供一个 token 过期时间的字段；使用了本地时间判断，若本地时间被篡改，特别是本地时间比服务器时间慢时，拦截会失败
 *  2. 不在请求前拦截，而是拦截返回后的数据。先发起请求，接口返回过期后，先刷新 token，再进行一次重试
 *    优点：不需额外的 token 过期字段，不需判断时间
 *    缺点：会消耗多一次请求，耗流量
 */

// 重定向到 login 页面
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 刷新 token
function refreshToken () {
  // 使用新的 axios 实例去请求，以防出现循环 401 现象
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 是否正在刷新 token
let isRefreshing = false
// 存储刷新 token 期间过来的 401 请求
let requests: (() => void)[] = []
// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, async error => {
  if (error.response) {
    // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 如果 vuex 中没有 token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 尝试刷新获取新的 token
      // 使用新的 axios 实例去请求，以防出现循环 401 现象
      if (!isRefreshing) {
        // 开启刷新状态
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) throw new Error('刷新 token 失败')
          // 成功了 => 把本次失败的请求重新发出去
          // 把刷新拿到的新的 access_token 更新到容器和本地存储中
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          // 把第一次失败的请求重新发出去
          return instance(error.config)
        }).catch((e) => {
          console.log(e)
          // 清除当前登录状态
          store.commit('setUser', null)
          // 请求 refresh_token 失败
          // 失败了 => 跳转到 login 页面
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          // 重置刷新状态
          isRefreshing = false
        })
      }

      // 刷新状态下，把请求挂起放到 requests 数组中
      // 第一次的不会存储到这里： 88 行代码
      return new Promise(resolve => {
        requests.push(() => {
          resolve(instance(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error('请求失败：' + error.message)
  }
  return Promise.reject(error)
})

export default instance
