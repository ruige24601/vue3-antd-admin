// import http from '@/utils/http/axios';
import http from '@/utils/request'

import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  GetUserInfoByUserIdModel,
} from './model/userModel'

enum Api {
  login = '/admin/login',
}

/**
 * @description: 用户登录
 */
export function login(params: LoginParams) {
  return http.request({
    url: Api.login,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: Api.login,
    method: 'POST',
  })
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request({
    url: `/user/u${uid}/changepw`,
    method: 'POST',
    params,
  })
}
