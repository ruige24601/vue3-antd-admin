<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
    @click="clickMenuItem"
  >
    <a-menu-item v-for="item in menus" :key="item.name">
      <icon-font
        :type="item.meta.icon"
        v-if="typeof item.meta.icon === 'string'"
      />
      <component :is="item.meta.icon" v-else />
      {{ item.meta.title }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watch,
  toRefs,
  inject,
  Ref,
  watchEffect,
} from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { Menu } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { routes } from '@/router'
import { IconFont } from '@/components/iconfont'

export default defineComponent({
  components: {
    [Menu.name]: Menu,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    SettingOutlined,
    IconFont,
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      selectedKeys: [currentRoute.matched[1]?.name],
    })

    const menus = computed(() =>
      store.getters.menus.length > 0
        ? store.getters.menus
        : routes.find(item => item.name == 'Layout')!.children
    )
    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == '/login') return
        state.selectedKeys = [currentRoute.matched[1]?.name]
      }
    )
    const sideMenu: Ref = inject('sideMenu') as Ref
    watch(
      menus,
      () => {
        sideMenu.value = menus.value.find(
          item => item.name === state.selectedKeys[0]
        )?.children
      },
      {
        immediate: true,
      }
    )

    // 点击菜单
    const clickMenuItem = ({ item, key, keyPath }) => {
      router.push({ name: key })
      sideMenu.value = menus.value.find(item => item.name === key)?.children
      state.selectedKeys = [key]
    }

    return {
      ...toRefs(state),
      menus,
      clickMenuItem,
    }
  },
})
</script>
<style lang="less">
// @import '~ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件
// @import '~@/styles/theme.less'; // 引入官方提供的 less 样式入口文件
// .iconFont {
//   color: @purple-6;
// }
</style>
