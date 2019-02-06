import request from '@/utils/request';

//登录
export function login(username, password, type = 1) {
  return request({
    url: '/common/login',
    method: 'post',
    data: {
      username,
      password,
      type
    }
  });
};
// 获取用户信息
export function getUserInfo(token, type = 1) {
  return request({
    url: '/common/getUserInfo',
    method: 'post',
    data: {
      token,
      type
    }
  });
};
// 检查用户名是否存在
export function checkName(username, type = 1) {
  return request({
    url: '/common/check',
    method: 'get',
    params: {
      username,
      type
    }
  });
};
// 注册
export function registerCustom({
  username,
  password,
  realName,
  phone,
  email
}) {
  return request({
    url: '/common/createCustomer',
    method: 'post',
    data: {
      username,
      password,
      realName,
      phone,
      email
    }
  });
};
