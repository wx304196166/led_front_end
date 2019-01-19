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
  width: 200px;

  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 35px;
    color: #fefefe;
    background: #949494;
    text-align: center;
  }
  .list {
    background: #f5f5f5;
    min-height: 500px;
    .item {
      padding: 20px 15px;
      > div {
        width: 100%;
        height: 170px;
        border: 1px solid #000;
      }
      > p {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
}
</style>
