export interface ResultBody<T> {
  code: string
  message: string
  timestamp: number
  responseBody: T
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
