<template>
  <div class="integration">
    <banner />
    <div class="page-container">
      <router-link to="/integration">
        <span class="add">+</span>
      </router-link>
      <ul class="integrationList">
        <li>
          <div class="integrationName">name</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odio.</div>
        </li>
        <li>
          <div class="integrationName">name</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odio.</div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import banner from '@/components/Banner/banner';
import { queryAllByCondition } from '@/api/common'
export default {
  name: 'Integration',
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
      queryAllByCondition({ name: 'integrate', condition: { create_user_id: this.token } }).then(res => {
        if (res.code === 0) {
          this.list=res.data;
        }else{
          this.$message.error(res.message);
        }
      })
    }
  },
  methods: {
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.add {
  float: right;
  margin-right: 50px;
  color: #fff;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: #33ccff;
  text-align: center;
  border-radius: 15px;
  font-size: 24px;
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
<style rel="stylesheet/scss" lang="scss">
</style>
