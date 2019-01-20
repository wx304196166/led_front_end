<template>
  <div id="app">
    <ul class="menu page-container clearfix">
      <li class="logo"></li>
      <li v-for="link in routes" :key="link.path" class="menu-item">
        <router-link :to="link.path">
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
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(item=>!item.hidden);
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 4.2857rem;
  line-height: 4.2857rem;
  background: rgba($color: #000000, $alpha: 0.78);
  font-size: 1.1429rem;
  color: #fff;
}
.logo{
  font-size: 24px;
}
.content {
  margin-top: 60px;
}
</style>
