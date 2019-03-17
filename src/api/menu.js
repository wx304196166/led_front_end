import request from '@/utils/request';

// 获取分类，品牌，标签信息
export function getCateList() {
  return request({
    url: '/api/index/cateList',
    method: 'get'
  });
}
