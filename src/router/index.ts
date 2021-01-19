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
    path: '/error/404',
    name: 'error/404',
    component: () => import('@/views/shared/error/404.vue'),
    meta: {
      title: '错误页',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
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
