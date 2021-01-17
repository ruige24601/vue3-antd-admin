import { RequestBody } from '@/types/base'
import Mock from 'mockjs2'
import { builder, getQueryParameters } from '@/mock/_util'

const totalCount = 5701

const serverList = options => {
  // const parameters = getQueryParameters(options)
  const parameters: RequestBody<any> = JSON.parse(options.body)
  const { requestPagination, requestEntity } = parameters
  const result: any[] = []
  // @ts-ignore
  const pageNo = parseInt(requestPagination.pageNumber)
  // @ts-ignore
  const pageSize = parseInt(requestPagination.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false,
    })
  }

  return builder({
    responseEntity: result,
    responsePagination: {
      pageSize: pageSize,
      pageNo: pageNo,
      totalCount: totalCount,
      totalPage: totalPage,
    },
  })
}

const queryServiceDetail = options => {
  const parameters: RequestBody<any> = JSON.parse(options.body)
  const { requestPagination, requestEntity } = parameters

  const tmpKey = requestEntity.id
  const result = {
    key: tmpKey,
    id: tmpKey,
    no: 'No ' + tmpKey,
    description: '这是一段描述',
    callNo: Mock.mock('@integer(1, 999)'),
    status: Mock.mock('@integer(0, 3)'),
    updatedAt: Mock.mock('@datetime'),
    editable: false,
  }

  return builder({
    responseEntity: result,
  })
}

const responseSuccess = () => {
  return builder()
}

Mock.mock(/\/service\/list/, 'post', serverList)
Mock.mock(/\/service\/detail/, 'post', queryServiceDetail)
Mock.mock(/\/service\/update/, 'post', responseSuccess)
Mock.mock(/\/service\/add/, 'post', responseSuccess)
