/**
 * 资源管理接口
 */
import instance from '@/utils/request'
import { AxiosPromise } from 'axios'

// 按条件分页查询资源
export const getResourcePages = (data: any): AxiosPromise => {
  return instance({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类列表
export const getResourceCategory = (): AxiosPromise => {
  return instance({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
