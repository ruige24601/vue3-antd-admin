import { ResultBody } from '@/types/base'
import http from '@/utils/request'
import {
  GetByUserIdParams,
  GetMenuListByUserIdResult,
  GetAuthCodeByUserIdResult,
} from './model/menuModel'

enum Api {
  adminMenus = '/admin/menus',
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus(): Promise<ResultBody<GetMenuListByUserIdResult>> {
  return http.request({
    url: Api.adminMenus,
    method: 'GET',
  })
}
