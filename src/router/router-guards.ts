import { isNavigationFailure, Router } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { createStorage } from '@/utils/Storage'

const Storage = createStorage()
import { debounce } from '@/utils/lodashChunk'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'icons', 'error', 'error-404'] // no redirect whitelist

const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'

// 是否需要从后端获取菜单
const isGetMenus = debounce(
  async ({ to, from, next }) => {
    return await store
      .dispatch('async-router/GenerateRoutes')
      .then(() => next())
      .catch(() => next({ path: defaultRoutePath }))
  },
  1800,
  { leading: true }
)

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start() // start progress bar
    const token = Storage.get(ACCESS_TOKEN)
    if (token) {
      if (to.name === 'login') {
        next({ path: defaultRoutePath })
      } else {
        if (store.state['async-router'].dynamicMenus.length === 0) {
          await isGetMenus({ to, from, next })
        } else {
          next()
        }
      }
    } else {
      // not login
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next()
      } else {
        next({
          path: loginRoutePath,
          query: { redirect: to.fullPath },
          replace: true,
        })
      }
    }
    // NProgress.done()
  })

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure)
    }
    NProgress.done() // finish progress bar
  })

  router.onError(error => {
    console.log(error, '路由错误')
  })
}
