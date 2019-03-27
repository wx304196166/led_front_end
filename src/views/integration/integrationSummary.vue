<template>
  <div class="integration">
    <banner/>
    <div class="page-container" style="marginTop:20px">
      <div class="btn">
        <span @click="jump('box')">Cabinet</span>
        <!-- <span @click="jump('module')">Module</span> -->
      </div>

      <ul class="integrationList">
        <li v-for="item in list" :key="item.id" @click="jump(item.id)" class="pointer">
          <div class="integrationName">{{item.name}}</div>
          <div>{{item.remarks}}</div>
        </li>
      </ul>
      <el-alert
        v-if="list.length===0"
        title="Tip"
        type="info"
        description="You still don't have any integration, try to click the button plus to add one."
        show-icon
      ></el-alert>
    </div>
  </div>
</template>

<script>
import banner from "@/components/Banner/banner";
import { schemeList } from "@/api/integration";
export default {
  name: "Integration",
  components: { banner },
  data() {
    return {
      list: []
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  created() {
    if (this.token) {
      schemeList(this.token).then(res => {
        if (res.code === 1) {
          this.list = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  methods: {
    jump(id) {
      this.$router.push({ path: "/integration", query: { id } });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn {
  float: right;
  > span {
    display: inline-block;
    padding: 8px 12px;
    background: linear-gradient(74deg, #49007c, #e70088);
    color: #fff;
    border-radius: 16px;
    cursor: pointer;
  }
  >span:first-child{
    margin-right: 15px;
  }
}
.integrationName {
  padding: 10px 0;
  font-size: 16px;
}
.integrationList {
  padding-bottom: 20px;
  clear: both;
}
.integrationList li {
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
}
</style>

