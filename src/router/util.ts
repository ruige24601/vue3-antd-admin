import { adminMenus } from '@/api/system/menu'
import { RouteRecordRaw } from 'vue-router'

/**
 * 生成菜单树
 */
const list2tree = (items, parentId = -1): Array<RouteRecordRaw> => {
  return items
    .filter(item => item.parentId == parentId)
    .map((item: any) => {
      const { icon, id, name, parentId, sort, keepAlive, meta, url } = item
      const path = url.startsWith('/') ? url : '/' + url

      return {
        path: path,
        // 路由名称，建议唯一
        name: path || '',
        children: list2tree(items, item.id),
        props: true,
        meta: {
          title: meta?.title || name,
          icon: icon || 'icon-zhuomian',
          keepAlive: keepAlive == 1,
        },
      }
    })
    .sort((a, b) => a.sort - b.sort)
}

/**
 * 动态生成菜单
 * @returns {Promise<Router[]>}
 */
export const generatorDynamicMenus = async () => {
  const result = await adminMenus()
  const menuTree = list2tree(result.responseEntity)
  menuTree.forEach(item => {
    // 设置模块重定向到菜单
    if ((item?.children?.length as number) > 0 && !item.redirect) {
      item.redirect = { name: item.children?.[0].name }
    }
  })
  return menuTree
}
