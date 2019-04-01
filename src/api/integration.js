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
}
// 获取点间距列表
export function pointspacingList(scenario) {
  return request({
    url: '/api/index/pointspacingList',
    method: 'post',
    data: {
      scenario
    }
  });
}
// 集成模组/箱体 查询
export function integrationMainProduct({ scenario, spacing_id, type }) {
  return request({
    url: '/api/index/integrationProducts',
    method: 'post',
    data: {
      scenario,
      spacing_id,
      type
    }
  });
}
// 推荐产品查询
export function integrationProducts(e, f) {
  return request({
    url: '/api/index/integrationProducts',
    method: 'post',
    data: {
      e,
      f
    }
  });
}
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
}
// 提交集成方案
export function submit(data) {
  return request({
    url: '/api/index/schemeSubmit',
    method: 'post',
    data
  });
}
