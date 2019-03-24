<template>
  <div style="height:100%">
    <div class="title">Related products</div>
    <ul class="list">
      <li class="item pointer" v-for="item in list" :key="item.id" @click="jump(item.id)">
        <img :src="item.thumbnail_pic" alt="">
        <p>{{item.name}}</p>
      </li>
      <li v-if="list.length===0" class="no-data">No Product</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Related',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },    
  methods: {    
    /* returnItem(item) {
      this.$emit('get-item', item);
    }, */
    jump(id){
      window.open('/#/productDetail/' + id )
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
