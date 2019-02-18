<template>
  <div class="maintenance">
    <banner />
    <div class="page-container box">
      <div class="marginTop">Headquarters</div>
      <div>T: +86 13109563986</div>
      <div>F: +86 (0)29 84187879</div>
      <div>Room 11928, Unit 1, Building2, I-City Block,</div>
      <div>No. 11 of Tang Yan South Road,</div>
      <div>Zhangba Street office, Hi-tech zone, Xi'an, Shaanxi</div>
      <div class="marginTop">Warehouse</div>
      <div>T: +86 185 9193 2311</div>
      <div>NO.13 E&T DEVELOPING ZONE FENGCHENG TWO STREET,XI'AN CHINA</div>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner/banner';
import { getBySN } from '@/api/maintenance';
import { parseTime } from '@/utils'
export default {
  name: 'Maintenance',
  components: { banner },
  data() {
    return {
      keyword: '',
      path: '/upload/product/',
      model: {}
    };
  },
  computed: {
    map() {
      return this.$store.getters.map.classification_id;
    }
  },
  methods: {
    search() {
      getBySN(this.keyword).then(res => {
        if (res.data && res.data.thumbnail) {
          this.model = res.data;
        } else {
          this.$message.info('Can not found relevant information');
        }
      })
    },
    setDate(date) {
      return parseTime(date, '{y}-{m}-{d}');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
</style>
