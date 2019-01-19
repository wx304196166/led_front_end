<template>
  <div>
    <ul class="intro clearfix">
      <li class="show-box">
        <div />
        <ul class="spec-list">
          <li />
          <li />
          <li />
        </ul>
      </li>
      <li class="blank" />
      <li class="describe-box">
        <div class="title">
          Led Colourful HD Display
          <i class="collect" />
        </div>
        <ul class="specifications clearfix">
          <li>Specifications:</li>
          <li />
        </ul>
        <p class="describe">
          Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis.
        </p>

      </li>
    </ul>
    <ul class="detail-box clearfix">
      <li class="related">
        <div class="title">Related products</div>
        <related />
      </li>
      <li class="blank">&emsp;</li>
      <li class="detail">
        <div class="tab">Commodity introduction</div>
        <div class="content">
          Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis. Cras vel nibh scelerisque urna tincidunt vestibulum accumsan pharetra ex. Proin ullamcorper eros non justo tincidunt lobortis. Ut sapien nisi, bibendum tempor efficitur ultricies, pellentesque interdum diam. Aliquam commodo felis eu urna consectetur, ut semper diam tempor. Etiam eu maximus sapien, a tristique tortor.
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import related from '@/components/related/related';
export default {
  name: 'ProductDetail',
  components: { related }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.intro,
.detail-box {
  padding: 20px 0;
}
.blank {
  width: 3.5%;
}
.intro {
  height: 500px;
  border: 1px solid #ccc;

  > li {
    float: left;
    height: 100%;
  }

  .show-box {
    width: 36.5%;

    > div {
      height: calc(100% - 80px);
      border: 1px solid #000;
    }

    .spec-list {
      height: 80px;

      > li {
        float: left;
        height: 100%;
        width: calc(100% - 44px);
      }

      > li:first-child,
      > li:last-child {
        width: 22px;
        background: url("../../assets/img/next.png") no-repeat center center;
      }

      > li:first-child {
        transform: scale(-1, 1);
      }
    }
  }

  .describe-box {
    width: 59%;

    .title {
      font-size: 28px;
      font-weight: 700;
      height: 30px;
      line-height: 30px;

      > i {
        position: relative;
        top: 6px;
        margin-left: 1em;
        display: inline-block;
        background: url("../../assets/img/collect.png") no-repeat center center;
        width: 31px;
        height: 100%;
      }
    }

    .specifications,
    .describe {
      margin-top: 25px;
    }

    .specifications {
      > li {
        float: left;
      }

      > li:first-child {
        width: 80px;
      }

      > li:first-child {
        width: calc(100% - 80px);
      }
    }

    .describe {
      text-indent: 2em;
    }
  }
}

.detail-box {
  > li {
    float: left;
  }
  .blank,
  .detail {
    min-height: 535px;
  }

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

  .detail {
    width: calc(96.5% - 200px);
    padding: 20px 0;
    .tab {
      font-size: 18px;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .content {
      padding: 20px 15px;
    }
  }
}
</style>
