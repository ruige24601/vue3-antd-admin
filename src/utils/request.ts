import axios from 'axios'
import store from '@/store'
import { createStorage } from '@/utils/Storage'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router'
import { message } from 'ant-design-vue'
import { RequestPrefix } from '@/enums/httpEnum'
const storage = createStorage()

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

// request interceptor
request.interceptors.request.use(
  config => {
    // 拼接前缀
    const urlPrefix = config.prefix || RequestPrefix.DEFAULT_PREFIX
    config.url = `${urlPrefix}${config.url}`

    const token = storage.get(ACCESS_TOKEN)
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Access-Token'] = token
      config.headers.token = token
    }
    return config
  },
  error => {
    console.error('request.interceptors.request:')
    console.error(error)
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(response => {
  // TODO:
  // if(response.data.code && response.data.code !== '0'){
  //   message.error(response.data.msg || response.data.sysMsg || '请求失败')
  //   return Promise.reject(response.data)
  // }
  return response.data
}, errorHandler)

// 异常拦截处理器
function errorHandler(error) {
  if (error.response) {
    if (error.response.status >= 403) {
      notification.error({
        message: error.response.status,
        description: codeMessage[error.response.status] || '响应未知错误',
      })
    } else if (error.response.status === 401) {
      notification.error({
        message: error.response.status,
        description:
          error.response.data.msg ||
          error.response.data.sysMsg ||
          '登录状态失效，请重新登录',
      })
      store.dispatch('Logout')
      router.replace('/login')
    }
  }
  return Promise.reject(error)
}

const codeMessage = {
  403: '禁止访问',
  404: '不存在',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发送错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

export default request
