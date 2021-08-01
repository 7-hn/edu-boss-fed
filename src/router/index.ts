import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  }, {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }, {
    path: '/',
    component: Layout,
    // meta 默认就是一个空对象（不设置就是空对象）
    meta: {
      requireAuth: true // 自定义数据
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }, {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      }, {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      }, {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      }, {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      }, {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      }, {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advertIndex' */ '@/views/advert/index.vue')
      }, {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advertSpace' */ '@/views/advert-space/index.vue')
      }, {
        path: '/create',
        name: 'create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 访问需要登录的页面的时候判断有没有登录状态（路由拦截器）
// 全局前置守卫：任何页面的访问都需要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
router.beforeEach((to, from, next) => {
  // to.matched 是一个数组（匹配到的路由记录）
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
