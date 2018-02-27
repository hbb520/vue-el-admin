import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/video/findByCategoryId',
    method: 'post',
    data: params
  })
}
export function getCategorys(params) {
  return request({
    url: '/categorys',
    method: 'get',
    params: params
  })
}
