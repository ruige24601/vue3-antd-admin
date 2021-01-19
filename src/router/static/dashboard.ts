import { markRaw } from 'vue'
import { RouteRecordRaw, RouterView } from 'vue-router'
import { RouterTransition } from '@/components/RouterTransition'
import { h } from 'vue'
import { BorderRightOutlined } from '@ant-design/icons-vue'
const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/welcome',
    component: markRaw(RouterTransition),
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
        component: () => import('@/views/shared/dashboard/welcome/index.vue'),
      },
    ],
  },
]

export default routes
