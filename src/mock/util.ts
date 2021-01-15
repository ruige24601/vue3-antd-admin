import { ResultBody, ResponsePagination } from '@/types/base'

interface BuilderData {
  responseEntity?: any
  responsePagination?: ResponsePagination
}

const resultBody: ResultBody<any> = {
  message: '',
  timestamp: 0,
  responseEntity: null,
  responsePagination: undefined,
  code: '0',
}

export const builder = (
  data: BuilderData,
  message?,
  code = '0',
  headers = {}
) => {
  resultBody.responseEntity = data.responseEntity
  resultBody.responsePagination = data.responsePagination
  if (message !== undefined && message !== null) {
    resultBody.message = message
  }
  if (code !== undefined && code !== '0') {
    resultBody.code = code
    resultBody._status = code
  }
  if (
    headers !== null &&
    typeof headers === 'object' &&
    Object.keys(headers).length > 0
  ) {
    resultBody._headers = headers
  }
  resultBody.timestamp = new Date().getTime()
  return resultBody
}

export const getQueryParameters = options => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = options => {
  return options.body && JSON.parse(options.body)
}
