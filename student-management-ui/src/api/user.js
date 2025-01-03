import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  // 移除值为 undefined 或空字符串的参数
  const cleanParams = {}
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== '') {
      cleanParams[key] = params[key]
    }
  })
  
  console.log('Clean params:', cleanParams)
  
  return request({
    url: '/api/users',
    method: 'get',
    params: cleanParams
  })
}

// 获取用户详情
export function getUser(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(id, data) {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'delete'
  })
}

// 用户登录
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: '/api/auth/profile',
    method: 'get'
  })
} 