<template>
  <div class="productBrand">
    <!-- brand -->
    <span class="bold">Brand:</span>
    <div class="brandBox" :class="{fold:toggle}">
      <span v-for="(item,index) in brands" :key="index" class="brand">{{ item }}</span>
    </div>
    <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggle}" @click="brandShowAll" />
    <!-- search -->
    <span class='search'>
      <input type="text" class="searchInput" placeholder="please enter keywords">
      <i class="searchIcon" />
    </span>
  </div>
</template>

<script>
import search from '@/components/Search/search';
export default {
  name: 'Products',
  components: { search },
  data() {
    return {
      toggle: true,
      brands: ['Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar', 'Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar', 'Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar', 'Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar', 'Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar', 'Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar']
    };
  },
  methods: {
    brandShowAll() {
      this.toggle = !this.toggle;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
