<template>
  <div class="logo">
    <img src="~@/assets/images/logo.png" alt="" />
    <h3 v-show="!collapsed" class="title">后台管理系统模板</h3>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    collapsed: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    margin-bottom: 0;
  }
}
</style>
