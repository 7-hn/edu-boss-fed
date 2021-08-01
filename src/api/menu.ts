/**
 * 菜单接口
 */
import instance from '@/utils/request'
import { AxiosPromise } from 'axios'

// 保存新增菜单
interface createMenuData {
  id?: number
  parentId: number
  name: string
  href: string
  icon: string
  orderNum: number
  description: string
  shown: boolean
}

export const createOrUpdateMenu = (data: createMenuData): AxiosPromise => {
  return instance({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取编辑菜单页面信息
export const getEditMenuInfo = (id = -1): AxiosPromise => {
  return instance({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
