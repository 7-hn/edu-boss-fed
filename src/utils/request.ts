import axios from 'axios'
import store from '@/store'

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

// 响应拦截器

export default instance
