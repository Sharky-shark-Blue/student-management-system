<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">学生管理系统</h2>
      </template>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'

const router = useRouter()

// 表单数据
const loginForm = ref({
  username: '',
  password: ''
})

// 表单规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 表单引用
const loginFormRef = ref()

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    const res = await login(loginForm.value)
    console.log('登录响应:', res)
    
    if (res.code === 200 && res.data) {
      // 保存token
      const token = res.data.token
      const user = res.data.user
      console.log('Token:', token)
      // 确保token包含Bearer前缀
      const tokenWithBearer = token.startsWith('Bearer ') ? token : `Bearer ${token}`
      localStorage.setItem('token', tokenWithBearer)
      // 保存用户信息
      localStorage.setItem('userInfo', JSON.stringify(user))
      
      // 登录成功后跳转到首页
      ElMessage.success('登录成功')
      router.push('/student')
    } else {
      ElMessage.error(res.message || '登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请重试')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
  margin: 0;
  color: #409eff;
}
</style> 