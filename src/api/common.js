import request from '@/utils/request';

export function  queryAllByList(data) {
  return request({
    url: '/api/v1/common/queryAllByList',
    method: 'post',
    data
  })
}
export function  queryAllByCondition(data) {
  return request({
    url: '/api/v1/common/queryAllByCondition',
    method: 'post',
    data
  })
}

export function  queryAll(index) {
  return request({
    url: '/api/v1/master/queryAll/' + index,
    method: 'get'
  })
}
export function  upload(index,data) {
  return request({
    url: '/api/v1/common/upload/' + index,
    method: 'post',
    headers: {'content-type': 'multipart/form-data'},
    data
  })
}
