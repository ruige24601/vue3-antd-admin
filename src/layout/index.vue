<template>
  <a-layout class="layout">
    <!--      页头 start-->
    <page-header v-model:collapsed="collapsed" />
    <!--      页头end-->

    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        class="layout-sider"
      >
        <!--      侧边菜单栏start-->
        <aside-menu :collapsed="collapsed" />
        <!--      侧边菜单栏end-->
      </a-layout-sider>
      <a-layout class="main-layout">
        <!--      内容区域start-->
        <a-layout-content class="layout-content">
          <!-- <tabs-view /> -->
          <a-card><RouterTransition /></a-card>
        </a-layout-content>
        <!--      内容区域end-->
        <!--      页脚start-->
        <page-footer />
        <!--      页脚end-->
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h, computed, provide } from 'vue'
import { Layout, message, Card } from 'ant-design-vue'
import Logo from './logo/index.vue'
import { TabsView } from './tabs'
import AsideMenu from './AsideMenu/index.vue'
import PageHeader from './header/index.vue'
import PageFooter from './footer'
import { RouterTransition } from '@/components/RouterTransition'

export default defineComponent({
  name: 'Layout',
  components: {
    TabsView,
    PageHeader,
    AsideMenu,
    Logo,
    PageFooter,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    RouterTransition,
    [Card.name]: Card,
  },
  setup() {
    const collapsed = ref<boolean>(false)
    const sideMenu = ref([])
    const testMsg = () => {
      message.success(h('span', '啥子'), 2)
    }

    const asiderWidth = computed(() => (collapsed.value ? '80px' : '256px'))

    provide('sideMenu', sideMenu)

    return {
      collapsed,
      sideMenu,
      testMsg,
      asiderWidth,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  overflow: hidden;
  height: 100vh;

  .layout-sider {
  }

  .ant-layout {
    overflow: hidden;
  }
  .main-layout {
    height: calc(100vh - 64px);
    overflow: auto;
  }
  .layout-content {
    flex: none;
    padding: 20px 14px 0;
  }
}
</style>
