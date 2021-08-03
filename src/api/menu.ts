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

// 获取菜单列表
export const getMenuNodeList = (): AxiosPromise => {
  return instance({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 删除菜单列表
export const deleteMenu = (id: number): AxiosPromise => {
  return instance({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

// 编辑菜单列表
export const editLoadMenu = (id: number): AxiosPromise => {
  return instance({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
