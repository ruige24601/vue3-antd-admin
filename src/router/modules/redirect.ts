import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    // path: '/redirect/:path*',
    path: '/redirect',
    name: 'Redirect',
    component: markRaw(RouterTransition),
    meta: {
      title: '重定向',
      // icon: 'SettingOutlined',
      // icon: 'icon-setting',
      icon: 'icon-fenxiang',
      hidden: true,
    },
    children: [
      {
        path: 'redirect',
        name: 'Redirect',
        component: require('@/views/shared/redirect/index.vue').default,
        meta: {
          title: '重定向',
          hidden: true,
        },
      },
    ],
  },
]

export default routes
