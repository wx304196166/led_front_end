import request from '@/utils/request';

// 登录
export function login(account, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    params: {
      account,
      password
    }
  });
}
// 登出
export function logout(logintoken) {
  return request({
    url: '/api/index/logout',
    method: 'post',
    data: {
      logintoken
    }
  });
}
// 获取用户信息
export function getUserInfo(logintoken) {
  return request({
    url: '/api/index/userInfo',
    method: 'post',
    data: {
      logintoken
    }
  });
}

// 注册
export function registerCustom({
  username,
  password,
  confirm_password,
  truename,
  mobile,
  email
}) {
  return request({
    url: '/api/user/register',
    method: 'post',
    params: {
      username,
      password,
      confirm_password,
      truename,
      mobile,
      email
    }
  });
}
