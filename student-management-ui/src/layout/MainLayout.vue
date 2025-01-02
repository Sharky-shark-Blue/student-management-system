<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        router
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/student">
          <el-icon><User /></el-icon>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item v-if="userInfo.isAdmin" index="/user">
          <el-icon><Setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <div class="header-container">
          <div class="header-title">学生管理系统</div>
          <div class="header-right">
            <el-dropdown @command="handleCommand">
              <span class="user-info">
                <el-avatar :size="32" :icon="UserFilled" />
                <span class="username">{{ userInfo.name || userInfo.username }}</span>
                <span class="role-tag">{{ userInfo.isAdmin ? '管理员' : '普通用户' }}</span>
                <el-icon><CaretBottom /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, Setting, UserFilled, CaretBottom } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userInfo = ref({})

const activeMenu = computed(() => {
  const { path } = route
  if (path.startsWith('/student')) return '/student'
  if (path.startsWith('/user')) return '/user'
  return path
})

// 获取用户信息
const getInfo = () => {
  try {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      userInfo.value = JSON.parse(storedUser)
      if (!userInfo.value.isAdmin && route.path.startsWith('/user')) {
        router.push('/student')
      }
    } else {
      ElMessage.error('用户信息不存在，请重新登录')
      router.push('/login')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败')
  }
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      ElMessageBox.confirm('确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        router.push('/login')
        ElMessage.success('退出成功')
      }).catch(() => {})
      break
  }
}

onMounted(() => {
  getInfo()
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
  color: #fff;
}

.el-menu {
  border-right: none;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin: 0 8px;
  color: #333;
}

.role-tag {
  font-size: 12px;
  padding: 2px 6px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  margin-right: 8px;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style> 