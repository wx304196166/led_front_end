<template>
  <div>
    <div id="map_div"></div>
    <div class="page-container box">
      <div class="marginTop"><img src="@/assets/img/ab1.png"> Headquarter</div>
      <div><i class="el-icon-phone-outline" /> +86 (029) 84187879</div>
      <div><i class="el-icon-printer" /> +86 (029) 84187879</div>
      <div><i class="el-icon-message" />  info@visual-artisan.tech</div>
      <div> <i data-v-9ece6142="" class="el-icon-location"></i> Room 11928, Unit 1, Building 2, I-City Block, No.11 of Tang Yan South Road, Zhangba Street office, Hi-tech Zone, Xi'an, China
      <li></li>
      </div>
      <div class="marginTop"><img src="@/assets/img/ab2.png"> Warehouse</div>
      <div><i class="el-icon-phone-outline" /> +86 (029) 81027496</div>
      <div> <i data-v-9ece6142="" class="el-icon-location"></i> No.13 E&T Development Zone Fengcheng Two Street, Xi'an, China
      <li></li>
      </div>
    </div>
  </div>
</template>

<script>
import { setMap } from './gmap.js';
export default {
  name: 'About',
  mounted() {
    setMap();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
#map_div {
  width: 100%;
  height: 439px;
  margin-top: 70px;
}
</style>
<style>
.amap-icon img {
  width: 25px;
  height: 34px;
}

.amap-marker-label {
  border: 0;
  background-color: transparent;
}

.info {
  position: relative;
  top: 0;
  right: 0;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
}
</style>

