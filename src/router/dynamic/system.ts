import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { h } from 'vue'

const routeName = 'system'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: '/system',
    // name: routeName,
    redirect: '/system/account',
    component: h(markRaw(RouterTransition), { notNeedKey: true }),
    meta: {
      title: '系统管理',
      icon: 'icon-zhuxingtu',
      keepAlive: true,
    },
    children: [
      {
        path: 'account',
        name: '/system/account',
        // name: `${routeName}-account`,
        meta: {
          title: '账号管理',
          icon: 'icon-kehuguanli',
          keepAlive: true,
        },
        component: () => import('@/views/auth/system/account/index.vue'),
      },
      {
        path: 'role',
        name: '/system/role',
        // name: `${routeName}-role`,
        meta: {
          title: '角色管理',
          icon: 'icon-shijuexianshi',
          keepAlive: true,
        },
        component: () => import('@/views/auth/system/role/index.vue'),
      },
      {
        path: 'access',
        name: '/system/access',
        // name: `${routeName}-access`,
        meta: {
          title: '资源管理',
          icon: 'icon-yun',
          keepAlive: true,
        },
        component: () => import('@/views/auth/system/access/index.vue'),
      },
      {
        path: 'dict',
        name: '/system/dict',
        // name: `${routeName}-dict`,
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
