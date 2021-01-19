import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { h } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: '/system',
    redirect: '/system/account',
    component: RouterTransition,
    meta: {
      title: '系统管理',
      icon: 'icon-zhuxingtu',
    },
    children: [
      {
        path: 'account',
        name: '/system/account',
        meta: {
          title: '账号管理',
          icon: 'icon-kehuguanli',
        },
        component: () => import('@/views/auth/system/account/index.vue'),
      },
      {
        path: 'role',
        name: '/system/role',
        meta: {
          title: '角色管理',
          icon: 'icon-shijuexianshi',
        },
        component: () => import('@/views/auth/system/role/index.vue'),
      },
      {
        path: 'access',
        name: '/system/access',
        meta: {
          title: '资源管理',
          icon: 'icon-yun',
        },
        component: () => import('@/views/auth/system/access/index.vue'),
      },
      {
        path: 'dict',
        name: '/system/dict',
        meta: {
          title: '字典管理',
          icon: 'icon-ziduanguanli',
          keepAlive: false,
        },
        component: () => import('@/views/auth/system/dict/index.vue'),
      },
    ],
  },
]

export default routes
