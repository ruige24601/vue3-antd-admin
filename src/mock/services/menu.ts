import Mock from 'mockjs2'
import { builder } from '../util'

const menus = [
  {
    id: 2,
    url: 'system/account',
    sort: 2,
    icon: 'icon-kehuguanli',
    keepAlive: 1,
    parentId: 1,
    name: '账号管理',
  },
  {
    id: 3,
    url: '/system/role',
    sort: 3,
    icon: 'icon-shijuexianshi',
    keepAlive: 1,
    parentId: 1,
    name: '角色管理',
  },
  {
    id: 4,
    url: 'system/access',
    sort: 5,
    icon: 'icon-yun',
    keepAlive: 1,
    parentId: 1,
    name: '资源管理',
  },
  {
    id: 1,
    url: 'system',
    sort: 6,
    icon: 'icon-zhuxingtu',
    keepAlive: 1,
    parentId: -1,
    name: '系统管理',
  },
  {
    id: 5,
    url: 'system/dict',
    sort: 6,
    icon: 'icon-ziduanguanli',
    keepAlive: 0,
    parentId: 1,
    name: '字典管理',
  },
]

const getMenus = options => {
  return builder({
    responseEntity: menus,
  })
}
Mock.mock(/\/admin\/menus/, 'get', getMenus)
