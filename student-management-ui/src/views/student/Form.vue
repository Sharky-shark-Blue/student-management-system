<template>
  <div class="student-form">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑学生' : '新增学生' }}</span>
        </div>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="学号" prop="studentNumber">
          <el-input v-model="form.studentNumber" placeholder="请输入学号" />
        </el-form-item>
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="年龄" prop="age">
          <el-input-number 
            v-model="form.age" 
            :min="1" 
            :max="100" 
            :precision="0"
            controls-position="right"
            placeholder="请输入年龄"
          />
          <div class="tip">年龄必须在1-100之间</div>
        </el-form-item>
        
        <el-form-item label="年级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择年级">
            <el-option label="大一" value="大一" />
            <el-option label="大二" value="大二" />
            <el-option label="大三" value="大三" />
            <el-option label="大四" value="大四" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="专业" prop="major">
          <el-input v-model="form.major" placeholder="请输入专业" />
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱地址" />
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" type="textarea" :rows="2" placeholder="请输入地址" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getStudent, addStudent, updateStudent } from '@/api/student'

const route = useRoute()
const router = useRouter()
const formRef = ref()

// 是否是编辑模式
const isEdit = computed(() => {
  return route.name === 'StudentEdit'
})

// 表单数据
const form = ref({
  studentNumber: '',
  name: '',
  gender: '男',
  age: 18,
  grade: '',
  major: '',
  phone: '',
  email: '',
  address: ''
})

// 表单验证规则
const rules = {
  studentNumber: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { pattern: /^\d{10}$/, message: '学号必须是10位数字', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
    { type: 'number', min: 1, max: 100, message: '年龄必须在1-100之间', trigger: 'blur' }
  ],
  grade: [
    { required: true, message: '请选择年级', trigger: 'change' }
  ],
  major: [
    { required: true, message: '请输入专业', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { min: 5, max: 100, message: '地址长度在 5 到 100 个字符', trigger: 'blur' }
  ]
}

// 获取学生信息
const getInfo = async (id) => {
  try {
    const res = await getStudent(id)
    if (res.code === 200 && res.data) {
      // 确保数据类型正确
      form.value = {
        ...res.data,
        gender: res.data.gender.toString(),
        age: parseInt(res.data.age)
      }
    }
  } catch (error) {
    console.error('获取学生信息失败:', error)
    ElMessage.error('获取学生信息失败')
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 确保数据类型正确
        const submitData = {
          ...form.value,
          studentNumber: form.value.studentNumber.toString(),
          age: Number(form.value.age)
        }
        
        console.log('提交的数据:', submitData)
        
        if (isEdit.value) {
          const res = await updateStudent(route.params.id, submitData)
          if (res.code === 200) {
            ElMessage.success('修改成功')
            router.push('/student')
          } else {
            ElMessage.error(res.message || '修改失败')
          }
        } else {
          const res = await addStudent(submitData)
          if (res.code === 200) {
            ElMessage.success('新增成功')
            router.push('/student')
          } else {
            ElMessage.error(res.message || '新增失败')
          }
        }
      } catch (error) {
        console.error('保存失败:', error)
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('保存失败')
        }
      }
    }
  })
}

// 取消
const cancel = () => {
  router.push('/student')
}

onMounted(() => {
  if (isEdit.value) {
    const id = route.params.id
    if (id) {
      getInfo(id)
    }
  }
})
</script>

<style scoped>
.student-form {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

:deep(.el-input-number) {
  width: 100%;
}
</style> 