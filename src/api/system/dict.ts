import { RequestEnum } from '@/enums/httpEnum'
import http from '@/utils/request'
enum Api {
  adminDictConfig = '/admin/dict_config',
}

/**
 * 获取账号管理列表
 * @param params
 */
export function getAdminDictConfig(params) {
  return http.request({
    url: Api.adminDictConfig,
    method: RequestEnum.GET,
    params,
  })
}

/**
 * 删除账号
 * @param params
 */
export function delAdminDictConfig(id: string) {
  return http.request({
    url: [Api.adminDictConfig, id].join('/'),
    method: RequestEnum.DELETE,
  })
}

/**
 * 修改账号
 * @param params
 */
export function patchAdminDictConfig(id, params) {
  return http.request({
    url: [Api.adminDictConfig, id].join('/'),
    method: RequestEnum.PATCH,
    params,
  })
}

/**
 * 新建账号
 * @param params
 */
export function postAdminDictConfig(params) {
  return http.request({
    url: Api.adminDictConfig,
    method: RequestEnum.POST,
    params,
  })
}
