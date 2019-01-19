<template>
  <div id="app">
    <ul class="menu clearfix">

      <li v-for="link in routes" :key="link.path" class="menu-item">
        <router-link v-if="!link.hidden" :to="link.path">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
    <div class="content">
      <router-view />
    </div>
    <div class="foot" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
}
.menu-item {
  flex: 1;
}
</style>
