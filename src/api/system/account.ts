import { RequestEnum } from '@/enums/httpEnum'
import http from '@/utils/request'

enum Api {
  adminAccount = '/admin/account',
}

/**
 * 获取账号管理列表
 * @param params
 */
export function getAdminAccount(params) {
  return http.request({
    url: Api.adminAccount,
    method: RequestEnum.GET,
    params,
  })
}

/**
 * 删除账号
 * @param params
 */
export function delAdminAccount(id: string) {
  return http.request({
    url: [Api.adminAccount, id].join('/'),
    method: RequestEnum.DELETE,
  })
}

/**
 * 修改账号
 * @param params
 */
export function patchAdminAccount(id, params) {
  return http.request({
    url: [Api.adminAccount, id].join('/'),
    method: RequestEnum.PATCH,
    params,
  })
}

/**
 * 新建账号
 * @param params
 */
export function postAdminAccount(params) {
  return http.request({
    url: Api.adminAccount,
    method: RequestEnum.POST,
    params,
  })
}
