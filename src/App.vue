<template>
  <div id="app">
    <ul class="menu page-container clearfix">
      <li class="logo gradient-font">VisualArtisan</li>
      <li v-for="link in routes" :key="link.path" class="link">
        <router-link :to="link.path">
          {{ link.name }}
        </router-link>
      </li>
      <li class="login-box gradient-font pointer">
        Log In / Sign Up
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
      return this.$router.options.routes.filter(item => !item.hidden);
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.gradient-font {
  color: transparent;
  background: linear-gradient(to top, #49007c, #e70088);
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -ms-background-clip: text;
  -o-background-clip: text;
}
.menu {
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 5rem;
  line-height: 5rem;
  background: rgba($color: #000000, $alpha: 0.78);
  font-size: 1.1429rem;
  color: #fafafa;
}
.logo {
  font-size: 2rem;
  width: 12.8571rem;
  font-weight: 700;
}
.link {
  flex: 1;
  text-align: center;
}
.login-box {
  position: absolute;
  right: 11.7857rem;
  top: 0.5rem;
  font-size: 1rem;
  line-height: 1rem;
}
</style>
