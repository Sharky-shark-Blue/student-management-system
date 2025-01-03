import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/student',
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'StudentList',
        component: () => import('../views/student/List.vue')
      },
      {
        path: 'add',
        name: 'StudentAdd',
        component: () => import('../views/student/Form.vue'),
        meta: { requiresAdmin: true }
      },
      {
        path: 'edit/:id',
        name: 'StudentEdit',
        component: () => import('../views/student/Form.vue'),
        meta: { requiresAdmin: true }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../layout/MainLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('../views/user/List.vue')
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('../views/user/Form.vue')
      },
      {
        path: 'edit/:id',
        name: 'UserEdit',
        component: () => import('../views/user/Form.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 如果是登录页面，直接放行
  if (to.path === '/login') {
    if (token) {
      next('/student')
    } else {
      next()
    }
    return
  }
  
  // 如果没有token，重定向到登录页
  if (!token) {
    next('/login')
    return
  }
  
  // 如果需要管理员权限
  if (to.meta.requiresAdmin) {
    const userInfo = localStorage.getItem('userInfo')
    const user = userInfo ? JSON.parse(userInfo) : {}
    if (!user.isAdmin) {
      next('/student')
      return
    }
  }
  
  next()
})

export default router 