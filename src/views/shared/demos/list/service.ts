import { RequestBody, ResultBody } from '@/types/base'
import http from '@/utils/request'
import { QueryParam, ServiceDetail } from './data'
export function getServiceList(
  parameter: RequestBody<QueryParam>
): Promise<ResultBody<any>> {
  return http.request({
    url: '/service/list',
    method: 'post',
    data: parameter,
  })
}

export function queryServiceDetail(
  parameter: RequestBody<any>
): Promise<ResultBody<ServiceDetail>> {
  return http.request({
    url: '/service/detail',
    method: 'post',
    data: parameter,
  })
}

export function serviceUpdate(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return http.request({
    url: '/service/update',
    method: 'post',
    data: parameter,
  })
}

export function serviceAdd(
  parameter: RequestBody<any>
): Promise<ResultBody<any>> {
  return http.request({
    url: '/service/add',
    method: 'post',
    data: parameter,
  })
}
