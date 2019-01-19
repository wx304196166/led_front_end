<template>
  <div class="related">
    <div class="title">Related products</div>
    <ul class="list">
      <li class="item">
        <div>图片</div>
        <p>Product name</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Related'

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.related {
  width: 14.2857rem;

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
    min-height: 35.7143rem;
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
}
</style>
