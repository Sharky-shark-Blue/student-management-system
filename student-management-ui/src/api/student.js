import request from '@/utils/request'

// 获取学生列表
export function getStudentList(params) {
  return request({
    url: '/api/students',
    method: 'get',
    params
  })
}

// 获取学生详情
export function getStudent(id) {
  return request({
    url: `/api/students/${id}`,
    method: 'get'
  })
}

// 新增学生
export function addStudent(data) {
  return request({
    url: '/api/students',
    method: 'post',
    data: {
      ...data,
      studentNumber: data.studentNumber,
      gender: data.gender.toString(),
      age: parseInt(data.age)
    }
  })
}

// 更新学生
export function updateStudent(id, data) {
  return request({
    url: `/api/students/${id}`,
    method: 'put',
    data: {
      ...data,
      studentNumber: data.studentNumber,
      gender: data.gender.toString(),
      age: parseInt(data.age)
    }
  })
}

// 删除学生
export function deleteStudent(id) {
  return request({
    url: `/api/students/${id}`,
    method: 'delete'
  })
} 