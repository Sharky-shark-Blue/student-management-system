import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      redirect: '/student',
      children: [
        {
          path: 'student',
          name: 'StudentList',
          component: () => import('@/views/student/List.vue')
        },
        {
          path: 'student/add',
          name: 'StudentAdd',
          component: () => import('@/views/student/Form.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'student/edit/:id',
          name: 'StudentEdit',
          component: () => import('@/views/student/Form.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'user',
          name: 'UserList',
          component: () => import('@/views/user/List.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'user/add',
          name: 'UserAdd',
          component: () => import('@/views/user/Form.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'user/edit/:id',
          name: 'UserEdit',
          component: () => import('@/views/user/Form.vue'),
          meta: { requiresAdmin: true }
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  
  // 如果是登录页面，直接放行
  if (to.path === '/login') {
    next()
    return
  }
  
  // 如果没有token，重定向到登录页
  if (!token) {
    next('/login')
    return
  }
  
  // 如果需要管理员权限
  if (to.meta.requiresAdmin) {
    const user = userInfo ? JSON.parse(userInfo) : {}
    if (!user.isAdmin) {
      ElMessage.warning('权限不足，无法访问该页面')
      next('/student')  // 如果不是管理员，重定向到学生管理页面
      return
    }
  }
  
  next()
})

export default router 