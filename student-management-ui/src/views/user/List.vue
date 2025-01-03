<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">添加用户</el-button>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 用户列表 -->
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag :type="row.isAdmin ? 'danger' : 'info'">
              {{ row.isAdmin ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, deleteUser } from '@/api/user'

const router = useRouter()
const loading = ref(false)
const total = ref(0)
const userList = ref([])
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  username: '',
  name: ''
})

// 获取用户列表
const getList = async () => {
  try {
    loading.value = true
    const params = {
      page: queryParams.value.pageNum - 1,
      size: queryParams.value.pageSize,
      username: queryParams.value.username || undefined,
      name: queryParams.value.name || undefined
    }
    console.log('Search params:', params)
    const res = await getUserList(params)
    console.log('API response:', res)
    
    if (res.data) {
      // 处理返回的数据
      if (Array.isArray(res.data)) {
        // 如果直接返回数组
        userList.value = res.data
        total.value = res.data.length
      } else if (res.data.content) {
        // 如果返回分页对象
        userList.value = res.data.content
        total.value = res.data.totalElements
      } else {
        // 其他情况，尝试直接使用返回数据
        userList.value = res.data
        total.value = res.total || res.data.length
      }
      console.log('Processed user list:', userList.value)
    } else {
      userList.value = []
      total.value = 0
      console.log('No data returned from API')
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败: ' + (error.message || '未知错误'))
    userList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 搜索
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}

// 重置
const resetQuery = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    username: '',
    name: ''
  }
  getList()
}

// 添加用户
const handleAdd = () => {
  router.push('/user/add')
}

// 编辑用户
const handleEdit = (row) => {
  router.push(`/user/edit/${row.id}`)
}

// 删除用户
const handleDelete = (row) => {
  ElMessageBox.confirm('确认要删除该用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteUser(row.id)
      ElMessage.success('删除成功')
      getList()
    } catch (error) {
      console.error('删除用户失败:', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

// 分页
const handleSizeChange = (val) => {
  queryParams.value.pageSize = val
  getList()
}

const handleCurrentChange = (val) => {
  queryParams.value.pageNum = val
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-card__header) {
  padding: 15px 20px;
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 20px;
}
</style> 