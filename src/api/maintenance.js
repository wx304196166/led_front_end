import request from '@/utils/request';

// 提交集成方案
export function getBySN(sn) {
  return request({
    url: '/api/v1/customer/maintenance',
    method: 'get',
    params:{
      sn
    }
  });
};
