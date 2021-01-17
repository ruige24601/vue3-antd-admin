import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { createRouterGuards } from './router-guards'
import 'nprogress/nprogress.css' // 进度条样式

import { App, markRaw } from 'vue'

import staticRoutes from './static'
import dynamicRoutes from './dynamic'
import { RouterTransition } from '@/components/transition'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页',
    },
    children: [...staticRoutes, ...dynamicRoutes],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/shared/login/index.vue'),
  },

  {
    path: '/error',
    name: 'error',
    redirect: '/error/404',
    component: markRaw(RouterTransition),
    meta: {
      title: '错误页',
      icon: 'EditOutlined',
      hidden: true,
    },
    children: [
      {
        path: '404',
        name: `error-404`,
        meta: {
          title: '404',
          icon: 'UserOutlined',
        },
        component: () => import('@/views/shared/error/404.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
    component: () => import('@/views/shared/error/404.vue'),
  },
]

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
