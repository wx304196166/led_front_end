import request from '@/utils/request';

// 获取集成方案列表
export function schemeList(logintoken) {
  return request({
    url: '/api/index/schemeList',
    method: 'post',
    data: {
      logintoken
    }
  });
};
// 获取点间距列表
export function pointspacingList() {
  return request({
    url: '/api/index/pointspacingList',
    method: 'get'
  });
};
// 集成模组/箱体 查询
export function integrationMainProduct({scenario, spacing_id}) {
  return request({
    url: '/api/index/integrationProducts',
    method: 'post',
    data: {
      scenario,
      spacing_id
    }
  });
};
// 推荐产品查询
export function integrationProducts(e,f) {
  return request({
    url: '/api/index/integrationProducts',
    method: 'post',
    data: {
      e,
      f
    }
  });
};
// 获取集成方案详情
export function schemeDetails(logintoken, id) {
  return request({
    url: '/api/index/schemeDetails',
    method: 'post',
    data: {
      logintoken,
      id
    }
  });
};
// 提交集成方案
export function submit(data) {
  return request({
    url: '/api/v1/customer/integration/submit',
    method: 'post',
    data
  });
};
