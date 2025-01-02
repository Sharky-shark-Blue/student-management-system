import request from '@/utils/request'

export function getStudentList(params) {
  return request({
    url: '/students',
    method: 'get',
    params
  })
}

export function getStudentById(id) {
  return request({
    url: `/students/${id}`,
    method: 'get'
  })
}

export function createStudent(data) {
  return request({
    url: '/students',
    method: 'post',
    data
  })
}

export function updateStudent(id, data) {
  return request({
    url: `/students/${id}`,
    method: 'put',
    data
  })
}

export function deleteStudent(id) {
  return request({
    url: `/students/${id}`,
    method: 'delete'
  })
} 