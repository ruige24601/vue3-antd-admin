<template>
  <ALayoutHeader class="layout-header">
    <div class="left-options">
      <Logo></Logo>
      <!-- <span
        @click="() => $emit('update:collapsed', !collapsed)"
        class="menu-fold"
      >
        <component
          :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
        />
      </span> -->
      <HeaderMenu class="headerMenu"></HeaderMenu>
      <!-- <a-breadcrumb>
        <template v-for="routeItem in route.matched" :key="routeItem.name">
          <a-breadcrumb-item>
            <a>{{ routeItem.meta.title }}</a>
            <template v-slot:overlay>
              <a-menu v-if="routeItem.children.length">
                <template v-for="childItem in routeItem.children">
                  <a-menu-item
                    v-if="!childItem.meta.hidden"
                    :key="childItem.name"
                  >
                    <router-link :to="{ name: childItem.name }">
                      {{ childItem.meta.title }}
                    </router-link>
                  </a-menu-item>
                </template>
              </a-menu>
            </template>
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb> -->
    </div>
    <div class="right-options">
      <!-- <template v-for="item in iconList" :key="item.icon.name">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          <component v-on="item.eventObject || {}" :is="item.icon" />
        </a-tooltip>
      </template> -->
      <!--      切换全屏-->
      <!-- <component :is="fullscreenIcon" @click="toggleFullScreen" /> -->
      <Dropdown>
        <a-avatar>{{ username }}</a-avatar>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a @click.prevent="doLogout"><poweroff-outlined /> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import components from '@/layout/header/components'
import { message, Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { TABS_ROUTES } from '@/store/mutation-types'
import HeaderMenu from './HeaderMenu.vue'
import Logo from '../logo/index.vue'

export default defineComponent({
  name: 'PageHeader',
  components: { ...components, HeaderMenu, Logo },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const store = useStore()

    const state = reactive({
      username: store.getters.userInfo.username,
      fullscreenIcon: 'FullscreenOutlined',
    })

    const router = useRouter()
    const route = useRoute()

    // 退出登录
    const doLogout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: createVNode(QuestionCircleOutlined),
        onOk: () => {
          console.log(router, '退出登录')
          // logout({})
          store.dispatch('user/Logout').then(res => {
            message.success('成功退出登录')
            // 移除标签页
            localStorage.removeItem(TABS_ROUTES)
            router
              .replace({
                name: 'login',
                query: {
                  redirect: route.fullPath,
                },
              })
              .finally(() => location.reload())
          })
        },
      })
    }

    // 切换全屏图标
    const toggleFullscreenIcon = () =>
      (state.fullscreenIcon =
        document.fullscreenElement !== null
          ? 'FullscreenExitOutlined'
          : 'FullscreenOutlined')

    // 监听全屏切换事件
    document.addEventListener('fullscreenchange', toggleFullscreenIcon)

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }

    // 图标列表
    const iconList = [
      {
        icon: 'SearchOutlined',
        tips: '搜索',
      },
      {
        icon: 'GithubOutlined',
        tips: 'github',
        eventObject: {
          click: () => window.open('https://github.com/buqiyuan/vue3-antd'),
        },
      },
      {
        icon: 'SettingOutlined',
        tips: '网站设置',
      },
    ]

    return {
      ...toRefs(state),
      iconList,
      toggleFullScreen,
      doLogout,
      route,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 0;
  height: $header-height;

  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 2px;

  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      padding: 0 24px;
      cursor: pointer;
    }
    .headerMenu {
      line-height: inherit;
      align-self: stretch;
      border-bottom-color: transparent;
      background-color: transparent;
      margin-left: 8px;
    }
  }

  .right-options {
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
