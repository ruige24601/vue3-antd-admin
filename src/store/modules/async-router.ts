/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import { Module } from 'vuex'
import { generatorDynamicRouter as generatorDynamicMenus } from '@/router/generator-routers'
import staticRoutes from '@/router/static'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const state = {
  dynamicMenus: [] as RouteRecordRaw[],
  menus: staticRoutes,
}

type StateType = typeof state

const asyncRouter: Module<StateType, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_DYNAMIC_MENUS: (state, dynamicMenus) => {
      state.dynamicMenus = dynamicMenus
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
  },
  actions: {
    async GenerateRoutes({ commit }) {
      const dynamicMenus = await generatorDynamicMenus()
      commit('SET_MENUS', [...staticRoutes, ...dynamicMenus])
      commit('SET_DYNAMIC_MENUS', dynamicMenus)
    },
  },
}

export default asyncRouter
