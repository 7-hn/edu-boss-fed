/**
 * 登录接口 api
 */
import qs from 'qs'
import instance from '@/utils/request'
import { AxiosPromise } from 'axios'

interface formData {
  phone: string
  password: string
}

interface loginResponse {
  success: string
  state: number
  message: string
  content: string
}

export const login = (data: formData): AxiosPromise<loginResponse> => {
  return instance({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 检测到 data 是 qs.stringify() 转换之后的数据：key=value&key1=value1 自动设置 Content-Type 为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data: qs.stringify(data)
  })
}
