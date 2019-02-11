<template>
  <div>
    <banner />

    <div class="page-container">
      <div class="productBrand">
        <!-- brand -->
        <span class="brand">Brand:</span>
        <div class="brandBox" :class="{fold:toggleBrand}">
          <span v-for="item in brands" :key="item.id" class="brand-item">{{ item.name }}</span>
        </div>
        <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggleBrand}" @click="toggleBrand = !toggleBrand" />
        <!-- search -->
        <span class='search'>
          <input type="text" class="searchInput" placeholder="please enter keywords">
          <i class="searchIcon" />
        </span>
      </div>
      <div class="productBrand">
        <span class="brand">Label:&nbsp;</span>
        <div class="brandBox" :class="{fold:toggleLabel}">
          <span v-for="item in labels" :key="item.id" class="brand-item">{{ item.name }}</span>
        </div>
        <span class="el-select__caret el-input__icon el-icon-arrow-down pointer" :class="{reverse:!toggleLabel}" @click="toggleLabel = !toggleLabel" />

      </div>
      <div class="productList">
        <single-product v-for="(item,index) in products" :key="index" :info="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from './singleProduct';
import banner from '@/components/Banner/banner';
import { queryAll } from '@/api/common';

export default {
  name: 'Products',
  components: { SingleProduct, banner },
  data() {
    return {
      toggleBrand: true,
      toggleLabel: true,
      classificationMap: {},
      labels: [],
      brands: [],
      products: [
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        }
      ]
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
      this.brands = this.classificationMap[this.classificationId]['brand_id'];
      this.labels = this.classificationMap[this.classificationId]['label_id'];
    } else {
      this.$message.error(res.message);
    }

  },
  watch: {
    classificationId(cur, old) {
      if (cur !== old) {
        this.brands = this.classificationMap[cur]['brand_id'];
        this.labels = this.classificationMap[cur]['label_id'];
      }
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
