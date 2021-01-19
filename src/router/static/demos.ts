import { RouteRecordRaw, RouterView } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from 'vue'
import { BorderRightOutlined } from '@ant-design/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: '/demos',
    redirect: '/demos/table-list',
    component: markRaw(RouterTransition),
    meta: {
      title: 'demo演示',
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: '/demos/table-list',
        name: '/demos/table-list',
        meta: {
          title: '查询表格',
          icon: BorderRightOutlined,
        },
        // component: RouterTransition,
        // component: RouterView,
        component: () => import('@/views/shared/demos/list/TableList.vue'),
      },
      {
        path: '/demos/table-list2',
        name: `/demos/table-list2`,
        meta: {
          title: '查询表格2',
          icon: BorderRightOutlined,
        },
        component: () => import('@/views/shared/demos/list/TableList2.vue'),
      },
      {
        path: '/demos/icons',
        name: '/demos/icons',
        redirect: '/demos/list-icons',
        meta: {
          title: 'icons',
          icon: BorderRightOutlined,
        },
        component: RouterView,
        children: [
          {
            path: '/demos/list-icons',
            name: '/demos/list-icons',
            meta: {
              title: 'list-icons',
              icon: BorderRightOutlined,
            },
            component: () => import('@/views/shared/icons/index.vue'),
          },
          {
            path: '/demos/custom-icons',
            name: `/demos/custom-icons`,
            meta: {
              title: '自定义图标',
              icon: 'icon-zhuomian',
            },
            component: () => import('@/views/shared/demos/icons/Iconfont.vue'),
          },
        ],
      },
      {
        path: '/demos/custom-a-custom-modal',
        name: `/demos/custom-modal`,
        meta: {
          title: '自定义模态框',
          icon: 'icon-zhuomian',
        },
        component: () => import('@/views/shared/demos/custom-modal.vue'),
      },
      {
        path: '/demos/button',
        name: `/demos/button`,
        meta: {
          title: '按钮的扩展',
          icon: 'icon-zhuomian',
        },
        component: () => import('@/views/shared/demos/button.vue'),
      },
      {
        path: '/demos/form',
        name: `/demos/form`,
        meta: {
          title: '验证表单',
          icon: 'icon-zhuomian',
          // keepAlive: false,
        },
        component: () => import('@/views/shared/demos/form/rule-form.vue'),
      },
    ],
  },
]

export default routes
