/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import { Module } from 'vuex'
import { generatorDynamicRouter } from '@/router/generator-routers'
import staticRoutes from '@/router/common'
const state = {
  addRouters: [],
  menus: staticRoutes,
}

type StateType = typeof state

const asyncRouter: Module<StateType, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.menus = routers
    },
  },
  actions: {
    async GenerateRoutes({ commit }) {
      const routers = await generatorDynamicRouter()
      commit('SET_ROUTERS', routers)
    },
  },
}

export default asyncRouter
