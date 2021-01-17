import { isIE } from '@/utils/util'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (
  process.env.NODE_ENV !== 'production' ||
  process.env.VUE_APP_PREVIEW === 'true'
) {
  if (isIE()) {
    console.error(
      '[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.'
    )
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('[antd-pro] mock mounting')
  const Mock = require('mockjs2')
  // require('./user')
  // require('./menu')
  // require('./admin')

  const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext)
  try {
    importAll(require.context('@/mock', true, /\.(ts|js)x?$/))
    importAll(require.context('@/views', true, /_mock\.(ts|js)x?$/))
  } catch (error) {
    console.log('自动导入 mock 数据失败：', error)
  }

  Mock.setup({
    timeout: 20, // setter delay time
  })
  console.log('[antd-pro] mock mounted')
}
