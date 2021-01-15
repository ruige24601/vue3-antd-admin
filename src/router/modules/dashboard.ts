import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { h } from 'vue'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/welcome',
    component: h(markRaw(RouterTransition), { notNeedKey: true }),
    meta: {
      title: '系统看板',
      icon: 'icon-yibiaopan',
    },
    children: [
      {
        path: 'welcome',
        name: `${routeName}-welcome`,
        meta: {
          title: '首页',
          icon: 'icon-shouye',
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard-welcome" */ '@/views/shared/dashboard/welcome/index.vue'
          ),
      },
      {
        path: 'article',
        name: `${routeName}-article`,
        meta: {
          title: 'article',
          icon: 'icon-shouye',
        },
        redirect: 'article1',
        component: h(markRaw(RouterTransition), { notNeedKey: true }),
        children: [
          {
            path: 'article1',
            name: `${routeName}-article1`,
            meta: {
              title: 'article1',
              icon: 'icon-shouye',
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard-article" */ '@/views/list/article.vue'
              ),
          },
          {
            path: 'article2',
            name: `${routeName}-article2`,
            meta: {
              title: 'article2',
              icon: 'icon-shouye',
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard-article" */ '@/views/list/article.vue'
              ),
          },
        ],
        // component: () =>
        //   import(
        //     /* webpackChunkName: "dashboard-article" */ '@/views/list/article.vue'
        //   )
      },
    ],
  },
]

export default routes
