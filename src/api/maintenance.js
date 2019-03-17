import request from '@/utils/request';

// 提交集成方案
export function maintenanceSearch(type, wd) {
  return request({
    url: '/api/index/maintenanceSearch',
    method: 'post',
    data: {
      type,
      wd
    }
  });
}
