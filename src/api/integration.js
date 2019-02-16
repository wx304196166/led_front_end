import request from '@/utils/request';

// 获取主商品清单
export function getMainProduct() {
  return request({
    url: '/api/v1/customer/integration',
    method: 'get'
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

