<template>
  <div>
    <banner />

    <div class="page-container">
      <div class="productBrand">
        <!-- brand -->
        <span class="brand">Brand:</span>
        <div class="brandBox" :class="{fold:toggleBrand}">
          <span v-for="item in brands" :key="item.id" @click="selFunc('brands',item)" :class="{active:item.active}" class="brand-item">{{ item.name }}</span>
        </div>
        <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggleBrand}" @click="toggleBrand = !toggleBrand" />
        <!-- search -->
        <span class='search'>
          <input v-model="keyword" @keyup="setProducts" type="text" class="searchInput" placeholder="please enter keywords">
          <i class="searchIcon" />
        </span>
      </div>
      <div class="productBrand">
        <span class="brand">Label:&nbsp;</span>
        <div class="brandBox" :class="{fold:toggleLabel}">
          <span v-for="item in labels" :key="item.id" @click="selFunc('labels',item)" :class="{active:item.active}" class="brand-item">{{ item.name }}</span>
        </div>
        <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggleLabel}" @click="toggleLabel = !toggleLabel" />

      </div>
      <div class="productList">
        <single-product v-for="item in sels" :key="item.id" :info="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from './singleProduct';
import Banner from '@/components/Banner/banner';
import { queryAll } from '@/api/common';

export default {
  name: 'Products',
  components: { SingleProduct, Banner },
  data() {
    return {
      toggleBrand: true,
      toggleLabel: true,
      classificationMap: {},
      labels: [{ id: 'all', name: 'all' }],
      brands: [{ id: 'all', name: 'all' }],
      products: [],
      selbrands: ['all'],
      sellabels: ['all'],
      sels: [],
      keyword: ''
    };
  },
  computed: {
    map() {
      return this.$store.getters.map;
    },
    classificationId() {
      return this.$store.getters.classificationId;
    }
  },
  async created() {
    res = await queryAll('product');
    if (res.code === 0) {
      this.products = res.data.filter(item => item.classification_id === this.classificationId);
    } else {
      this.$message.error(res.message);
    }
    let res = await queryAll('classification');
    if (res.code === 0) {
      res.data.forEach(item => {
        const obj = {
          brand_id: [],
          label_id: []
        }
        let arr = item.brand_id.split(',');
        arr.forEach(id => {
          obj.brand_id.push(
            {
              id,
              name: this.map.brand_id[id]
            }
          )
        })

        arr = item.label_id.split(',');
        arr.forEach(id => {
          obj.label_id.push(
            {
              id,
              name: this.map.label_id[id]
            }
          )
        })
        this.classificationMap[item.id] = obj;
      })
      this.setList(this.classificationId);
    } else {
      this.$message.error(res.message);
    }

  },
  watch: {
    classificationId(cur, old) {
      if (cur !== old) {
        this.setList(cur);
      }
    }
  },
  methods: {    
    setList(id) {
      let arr = [{ id: 'all', name: 'all' }].concat(this.classificationMap[id]['brand_id']);
      this.brands = arr.map(item => {
        const flag = item.id === 'all' ? true : false;
        this.$set(item, 'active', flag);
        return item;
      })

      arr = [{ id: 'all', name: 'all' }].concat(this.classificationMap[id]['label_id']);
      this.labels = arr.map(item => {
        const flag = item.id === 'all' ? true : false;
        this.$set(item, 'active', flag);
        return item;
      })
      this.selbrands = ['all'];
      this.sellabels = ['all'];
      this.setProducts();
    },
    selFunc(tag, item) {
      if (item.id === 'all' && item.active === true) { return; }
      if (item.id === 'all') {
        for (const obj of this[tag]) {
          obj.active = false;
        }
        item.active = true;
        this['sel' + tag] = ['all'];
      } else {
        this[tag][0].active = false;
        item.active = !item.active;
        this['sel' + tag] = [];
        for (const obj of this[tag]) {
          if (obj.active) {
            this['sel' + tag].push(obj.id);
          }
        }
      }

      this.setProducts();
    },
    setProducts() {
      this.sels = this.products.filter(item => {
        const inBrand = this.selbrands.includes('all') || this.selbrands.includes(item.brand_id);
        const inLabel = this.sellabels.includes('all') || this.sellabels.includes(item.label_id);
        const matchKeyword = item.name.includes(this.keyword);
        return inBrand && inLabel && matchKeyword;
      })
    }
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.photo {
  border: 1px solid #000;
  height: 200px;
  margin-bottom: 20px;
}
.productList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  transition: height 0.38s;
}
.productBrand {
  margin: 20px 0;
  .brand {
    font-weight: 700;
    display: inline-block;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    border-radius: 4px;
  }
  .brandBox {
    display: inline-block;
    padding: 0 10px;
    vertical-align: text-top;
    font-weight: bold;
    .brand-item {
      display: inline-block;
      margin-right: 1.4286rem;
      &:hover,
      &.active {
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
    float: right;
    .searchIcon {
      position: absolute;
      transform: scale(0.6);
      top: 5px;
      left: 5px;
      width: 22px;
      height: 22px;
      background: url("../../assets/img/icon_search.png") no-repeat 0 0;
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
