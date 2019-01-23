<template>
  <div style="height:100%">
    <div class="title">Related products</div>
    <ul class="list">
      <li class="item pointer" v-for="item in list" :key="item.id" @click="returnItem(item)">
        <div>图片</div>
        <p>{{item.name}}</p>
      </li>
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
    returnItem(item) {
      this.$emit('get-item', item)
    }
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: 1.2857rem;
  font-weight: 700;
  line-height: 2.5rem;
  color: #fefefe;
  background: #949494;
  text-align: center;
}
.list {
  background: #f5f5f5;
  height: calc(100% - 2.5rem);
  overflow-y: auto;
  .item {
    padding: 1.4286rem 1.0714rem;
    > div {
      width: 100%;
      height: 12.1429rem;
      border: 1px solid #000;
    }
    > p {
      font-size: 1.1429rem;
      line-height: 1.4286rem;
    }
  }
}
</style>
