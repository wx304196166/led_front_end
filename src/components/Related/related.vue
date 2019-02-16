<template>
  <div style="height:100%">
    <div class="title">Related products</div>
    <ul class="list">
      <li class="item pointer" v-for="item in related" :key="item.id" @click="returnItem(item)">
        <img :src="imgPath + item.thumbnail" alt="">
        <p>{{item.name}}</p>
      </li>
      <li v-if="ids.length===0" class="no-data">No Product</li>
    </ul>
  </div>
</template>

<script>
import { queryMany } from '@/api/common';
export default {
  name: 'Related',
  props: {
    ids: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { imgPath: '/upload/product/', related: [] }
  },
  mounted() {
    if (this.ids.length) {
      this.init(this.ids);
    } else {
      this.related = [];
    }

  },
  watch: {
    ids(newVal, oldVal) {
      if (newVal.length) {
        this.init(newVal);
      } else {
        this.related = [];
      }
    }
  },
  methods: {
    init(ids) {
      queryMany('product', { ids }).then(res => {
        if (res.code === 0) {
          this.related = res.data;
        }
      })
    },
    returnItem(item) {
      this.$emit('get-item', item);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: 1.2857rem;
  font-weight: 700;
  height: 3.5714rem;
  line-height: 3.5714rem;
  color: #fefefe;
  background: #949494;
  text-align: center;
}
.list {
  background: #f5f5f5;
  height: calc(100% - 3.5714rem);
  overflow-y: auto;
  .item {
    width: 100%;
    padding: 1.4286rem 1.0714rem;
    > img {
      width: 100%;
      height: auto;
    }
    > p {
      font-size: 1.1429rem;
      line-height: 1.4286rem;
      text-align: center;
      font-weight: 700;
    }
  }
}
.no-data {
  height: 80px;
  text-align: center;
  line-height: 80px;
}
</style>
