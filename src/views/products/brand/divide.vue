<template>
  <div class="productBrand">
    <!-- brand -->
    <span>Brand:</span>
    <div class="brandBox" :class="{fold:toggle}">
      <span v-for="(item,index) in brands" :key="index" class="brand">{{ item }}</span>
    </div>
    <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggle}" @click="brandShowAll" />
    <!-- search -->
    <input type="text" class="searchInput" placeholder="please enter keywords">
  </div>
</template>

<script>

export default {
  name: 'Products',
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
.productBrand {
  margin: 0 auto;  
  .brandBox {
    display: inline-block;
    width: 70%;
    padding: 0 10px;
    vertical-align: text-top;
    .brand {
      display: inline-block;
      margin-right: 1.4286rem;
    }
  }
  .fold {
    height: 18px;
    overflow: hidden;
  }
  .reverse{
    transform: rotate(180deg);
  }
  .searchInput {
    border-radius: 10px;
    background-color: #eee;
    height: 20px;
    width: 200px;
    padding-left: 10px;
    margin-right: 10px;
  }
}
</style>
