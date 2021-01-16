import { RouteRecordRaw, RouterView } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from 'vue'
import { BorderRightOutlined } from '@ant-design/icons-vue'

const routeName = 'demos'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: routeName,
    redirect: '/demos/table-list',
    component: markRaw(RouterTransition),
    meta: {
      title: 'demo演示',
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: 'table-list',
        name: `${routeName}-table-list`,
        meta: {
          title: '查询表格',
          icon: BorderRightOutlined,
        },
        // component: RouterTransition,
        // component: RouterView,
        component: () => import('@/views/list/article.vue'),
      },
      {
        path: 'custom-a-custom-modal',
        name: `${routeName}-custom-modal`,
        meta: {
          title: '自定义模态框',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () => import('@/views/shared/demos/custom-modal.vue'),
      },
      {
        path: 'button',
        name: `${routeName}-button`,
        meta: {
          title: '按钮的扩展',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () => import('@/views/shared/demos/button.vue'),
      },
      {
        path: 'form',
        name: `${routeName}-form`,
        meta: {
          title: '验证表单',
          icon: 'icon-zhuomian',
          // keepAlive: false,
        },
        component: () => import('@/views/shared/demos/form/rule-form.vue'),
      },
      {
        path: 'icons',
        name: `${routeName}-icons`,
        meta: {
          title: '自定义图标',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () => import('@/views/shared/demos/icons/Iconfont.vue'),
      },
    ],
  },
]

export default routes
