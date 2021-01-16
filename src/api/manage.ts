import { RequestBody, ResultBody } from '@/types/base'
import request from '@/utils/request'
// import http from '@/utils/http/axios'
// const request = http.request

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
}

export default api

export function getUserList(parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter,
  })
}

export function getRoleList(parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter,
  })
}

// export function getServiceList(parameter) {
//   return request({
//     url: api.service,
//     method: 'get',
//     params: parameter,
//   })
// }

export function getServiceList(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return request.request({
    url: api.service,
    method: 'post',
    data: parameter,
  })
}

export function queryServiceDetail(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return request.request({
    url: api.service + '/detail',
    method: 'post',
    data: parameter,
  })
}

export function serviceUpdate(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return request.request({
    url: api.service + '/update',
    method: 'post',
    data: parameter,
  })
}

export function serviceAdd(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return request.request({
    url: api.service + '/add',
    method: 'post',
    data: parameter,
  })
}

export function getPermissions(parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter,
  })
}

export function getOrgTree(parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter,
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter,
  })
}

export function saveSub(sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub,
  })
}
