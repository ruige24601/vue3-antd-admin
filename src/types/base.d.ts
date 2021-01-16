import { RoleEnum } from '@/enums/roleEnum'

export interface ResultBody<T> {
  code: string
  message: string
  timestamp: number
  responseEntity: T
  responsePagination?: ResponsePagination
  _status?: string
  _headers?: string
}

export interface ResponsePagination {
  pageNo: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export interface RequestBody<T> {
  requestEntity: T
  requestPagination?: RequestPagination
}

export interface RequestPagination {
  pageNumber: number
  pageSize: number
}

export interface RouteMetaCustom {
  // 名称
  title: string
  // roles?: RoleEnum[];
  // 是否缓存。默认缓存。当为 false 时，不缓存
  keepAlive?: boolean
  // tab上的图标, 字符串或组件
  icon?: string
}
