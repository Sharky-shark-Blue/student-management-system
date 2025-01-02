<template>
  <div class="student-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>学生列表</span>
          <el-button v-if="isAdmin" type="primary" @click="handleAdd">新增学生</el-button>
        </div>
      </template>
      
      <el-table
        v-loading="loading"
        :data="studentList"
        style="width: 100%"
      >
        <el-table-column prop="studentNumber" label="学号" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="gender" label="性别" width="80" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="grade" label="年级" width="120" />
        <el-table-column prop="major" label="专业" />
        
        <el-table-column v-if="isAdmin" label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStudentList, deleteStudent } from '@/api/student'

const router = useRouter()
const loading = ref(false)
const studentList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 判断是否是管理员
const isAdmin = computed(() => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return user.isAdmin
  }
  return false
})

// 获取学生列表
const fetchStudents = async () => {
  loading.value = true
  try {
    const res = await getStudentList({
      page: currentPage.value - 1,
      size: pageSize.value
    })
    console.log('Student list response:', res)
    if (res.code === 200 && res.data) {
      studentList.value = res.data.content
      total.value = res.data.totalElements
    }
  } catch (error) {
    console.error('获取学生列表失败:', error)
    ElMessage.error('获取学生列表失败')
  } finally {
    loading.value = false
  }
}

// 新增学生
const handleAdd = () => {
  router.push('/student/add')
}

// 编辑学生
const handleEdit = (row) => {
  router.push(`/student/edit/${row.id}`)
}

// 删除学生
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除该学生吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteStudent(row.id)
      ElMessage.success('删除成功')
      fetchStudents()
    } catch (error) {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

// 处理每页显示数量变化
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchStudents()
}

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchStudents()
}

onMounted(() => {
  fetchStudents()
})
</script>

<style scoped>
.student-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 