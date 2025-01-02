import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage中获取token
    const token = localStorage.getItem('token')
    console.log('Current token:', token)
    
    if (token) {
      // 将token添加到请求头中
      config.headers['Authorization'] = token
    }
    
    // 打印完整的请求配置
    console.log('Full request config:', {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
      headers: config.headers,
      params: config.params,
      data: config.data
    })
    
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('Response:', response)
    const res = response.data
    
    // 如果响应成功
    if (res.code === 200) {
      return res
    }
    
    // 处理其他状态码
    ElMessage.error(res.message || '请求失败')
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    console.error('Response error:', error)
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      })
    }
    
    // 处理401和403错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          router.push('/login')
          ElMessage.error('登录已过期，请重新登录')
          break
        case 403:
          // 权限不足，清除token并跳转到登录页
          localStorage.removeItem('token')
          router.push('/login')
          ElMessage.error('权限不足，请重新登录')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误：' + (error.response.data?.message || '未知错误'))
          break
        default:
          ElMessage.error(error.response?.data?.message || '请求失败')
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request)
      ElMessage.error('服务器无响应，请检查后端服务是否正常运行')
    } else {
      // 请求配置出错
      console.error('Request config error:', error.message)
      ElMessage.error('请求配置错误：' + error.message)
    }
    
    return Promise.reject(error)
  }
)

export default request 