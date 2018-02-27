import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error.response)// for debug
    Message({
      message: '服务器出错',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
