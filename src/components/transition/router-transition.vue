<template>
  <router-view v-slot="{ Component }">
    <transition name="zoom-fade" mode="out-in" appear>
      <keep-alive :exclude="excludeComNames">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { RouteMetaCustom } from '@/types/base'
import { defineComponent, watch, ref, KeepAlive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'router-transition',
  components: {
    KeepAlive,
  },
  setup() {
    const route = useRoute()
    const excludeComNames = ref<string[]>([])
    watch(
      () => route.fullPath,
      () => {
        const currentComName = route.matched.find(
          item => item.name == route.name
        )?.components?.default.name
        if (
          currentComName &&
          (route.meta as RouteMetaCustom).keepAlive === false &&
          !excludeComNames.value.includes(currentComName)
        ) {
          excludeComNames.value.push(currentComName)
        }
      },
      { immediate: true }
    )

    return {
      excludeComNames,
    }
  },
})
</script>
