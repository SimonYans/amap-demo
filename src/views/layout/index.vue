<template>
  <div class="app-wrapper">
    <div class="sidebar-container"></div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler';
export default {
  name: 'layout',
  components: {},
  mixins: [ResizeMixin]
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {}
</style>
