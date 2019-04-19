<template>
  <div>
    <banner/>

    <div class="page-container">
      <div class="productBrand">
        <!-- brand -->
        <span class="all" @click="selFunc('brands',{ id: 'all', name: 'all' })">
          <img :src="brandImg" alt>
        </span>
        <div class="brandBox" :class="{fold:toggleBrand}">
          <span
            v-for="item in brands"
            :key="item.id"
            @click="selFunc('brands',item)"
            :class="{active:item.active}"
            class="brand-item"
          >{{ item.name }}</span>
        </div>
        <span
          class="el-select__caret el-input__icon el-icon-arrow-down pointer"
          :class="{reverse:!toggleBrand}"
          @click="toggleBrand = !toggleBrand"
        />
        <!-- search -->
        <span class="search">
          <input
            v-model="keyword"
            @keyup="setProducts"
            type="text"
            class="searchInput"
            placeholder="please enter keywords"
          >
          <i class="searchIcon"/>
        </span>
      </div>
      <div class="productBrand">
        <span class="all" @click="selFunc('labels',{ id: 'all', name: 'all' })">
          <img :src="labelImg" alt>
        </span>
        <div class="brandBox" :class="{fold:toggleLabel}">
          <span
            v-for="item in labels"
            :key="item.id"
            @click="selFunc('labels',item)"
            :class="{active:item.active}"
            class="brand-item"
          >{{ item.name }}</span>
        </div>
        <span
          class="el-select__caret el-input__icon el-icon-arrow-down pointer"
          :class="{reverse:!toggleLabel}"
          @click="toggleLabel = !toggleLabel"
        />
      </div>
      <div class="productList">
        <single-product v-for="item in sels" :key="item.id" :info="item"/>
      </div>
      <div v-show="hasMore" class="more">
        <div @click="getMore" class="pointer">More</div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from "./singleProduct";
import Banner from "@/components/Banner/banner";
import { getCascadeBrandLable, getProductList } from "@/api/product";
import brandImg from "@/assets/img/products/brand.png";
import labelImg from "@/assets/img/products/label.png";

export default {
  name: "Products",
  components: { SingleProduct, Banner },
  data() {
    return {
      toggleBrand: true,
      toggleLabel: true,
      classificationMap: {},
      labels: [],
      brands: [],
      products: [],
      selbrands: ["all"],
      sellabels: ["all"],
      sels: [],
      keyword: "",
      page: 1,
      hasMore: true,
      brandImg,
      labelImg
    };
  },
  computed: {
    map() {
      return this.$store.getters.map;
    }
  },
  watch: {
    $route(cur, old) {
      if (cur !== old) {
        this.classificationId = this.$route.params.id;
        this.setList();
      }
    }
  },
  mounted() {
    this.classificationId = this.$route.params.id;
    this.setList();
  },
  methods: {
    setList() {
      getCascadeBrandLable(this.classificationId).then(res => {
        if (res.code === 1) {
          let brandArr = res.data.brands;
          this.brands = brandArr.map(item => {
            const flag = item.id === "all" ? true : false;
            this.$set(item, "active", flag);
            return item;
          });
          let labelArr = res.data.lables;
          this.labels = labelArr.map(item => {
            const flag = item.id === "all" ? true : false;
            this.$set(item, "active", flag);
            return item;
          });
          this.selbrands = ["all"];
          this.sellabels = ["all"];
          this.setProducts();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    selFunc(tag, item) {
      if (item.id === "all") {
        for (const obj of this[tag]) {
          obj.active = false;
        }
        this["sel" + tag] = ["all"];
      } else {
        item.active = !item.active;
        this["sel" + tag] = [];

        for (const obj of this[tag]) {
          if (obj.active) {
            this["sel" + tag].push(obj.id);
          }
        }
      }
      this.setProducts();
    },
    setProducts() {
      this.page = 1;
      getProductList(
        Number(this.classificationId),
        this.selbrands,
        this.sellabels,
        this.keyword,
        this.page
      ).then(res => {
        if (res.code === 1) {
          this.sels = res.data.list;
          if (res.data.list.length < 20) {
            this.hasMore = false;
          } else {
            this.hasMore = true;
          }
        }
      });
    },
    getMore() {
      this.page++;
      getProductList(
        Number(this.classificationId),
        this.selbrands,
        this.sellabels,
        this.keyword,
        this.page
      ).then(res => {
        if (res.code === 1) {
          this.sels = this.sels.concat(res.data.list);
          if (res.data.list.length < 20) {
            this.hasMore = false;
          }
        }
      });
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
  .all {
    display: inline-block;
    padding: 0 10px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    img {
      width: 100%;
    }
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
.more {
  text-align: center;
  margin: 22px 0;
  > div {
    display: inline-block;
    width: 160px;
    text-align: center;
    background: linear-gradient(74deg, #49007c, #e70088);
    color: #fff;
    height: 30px;
    line-height: 30px;
    border-radius: 28.5712px;
  }
}
</style>
