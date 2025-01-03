<template>
  <div class="login-page">
    <div class="login-box">
      <h2>学生管理系统</h2>
      <div class="login-form">
        <div class="form-item">
          <input 
            v-model="loginForm.username" 
            type="text" 
            placeholder="请输入用户名"
          >
        </div>
        <div class="form-item">
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
          >
        </div>
        <div class="form-item">
          <button 
            class="login-button"
            :disabled="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'

const router = useRouter()
const loading = ref(false)

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    alert('请输入用户名和密码')
    return
  }
  
  try {
    loading.value = true
    const res = await login(loginForm.value)
    console.log('登录响应:', res)
    
    if (res.code === 200 && res.data) {
      const token = res.data.token
      const user = res.data.user
      const tokenWithBearer = token.startsWith('Bearer ') ? token : `Bearer ${token}`
      localStorage.setItem('token', tokenWithBearer)
      localStorage.setItem('userInfo', JSON.stringify(user))
      router.push('/student')
    } else {
      alert(res.message || '登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1f4037 0%, #99f2c8 100%);
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
}

h2 {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  width: 100%;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-button:hover {
  background-color: #66b1ff;
}

.login-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}
</style> 