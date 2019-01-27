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
    font-weight: bold;
    .brand {
      display: inline-block;
      margin-right: 1.4286rem;
      &:hover {
        color: #e70088;
        cursor: pointer;
      }
    }
  }
  .fold {
    height: 18px;
    overflow: hidden;
  }
  .reverse {
    transform: rotate(180deg);
  }
  .search {
    position: relative;
    .searchIcon {
      position: absolute;
      transform: scale(0.6);
      top: -3px;
      left:5px;
      width: 22px;
      height: 22px;
      background: url("../../../assets/img/icon_search.png") no-repeat 0 0;
    }
    .searchInput {
      border-radius: 15px;
      background-color: #eee;
      height: 30px;
      width: 200px;
      padding-left: 30px;
      margin-right: 10px;
    }
  }
}
</style>
