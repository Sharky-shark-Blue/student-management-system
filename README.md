# 学生管理系统 🎓

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Vue](https://img.shields.io/badge/Vue-3.x-blue.svg)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-latest-blue.svg)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 一个现代化的学生管理系统，基于 Spring Boot + Vue3 的前后端分离架构，提供完整的学生信息管理功能。

## ✨ 功能特性

### 🔐 用户认证与授权
- 安全的用户登录/注销系统
- 基于 JWT 的身份验证机制
- 细粒度的角色权限控制（管理员/普通用户）

### 📚 学生管理
- 完整的学生信息 CRUD 操作
- 高效的分页查询功能
- 严格的字段验证机制

### 👥 用户管理（管理员专属）
- 用户账号的全面管理
- 灵活的角色分配系统

## 🛠️ 技术栈

### 后端技术
- **Spring Boot 3.2.3** - 强大的应用开发框架
- **Spring Security + JWT** - 安全认证和授权
- **Spring Data JPA** - 优雅的数据访问层
- **MySQL** - 可靠的数据存储
- **Maven** - 依赖管理和构建工具

### 前端技术
- **Vue 3** - 渐进式 JavaScript 框架
- **Element Plus** - 美观的 UI 组件库
- **Vue Router** - 路由管理
- **Axios** - HTTP 客户端
- **Vite** - 下一代前端构建工具

## 📁 项目结构

```bash
├── 📂 springboot-students-manag-sys/    # 后端项目
│   ├── 📂 src/
│   │   ├── 📂 main/
│   │   │   ├── 📂 java/                # Java 源代码
│   │   │   └── 📂 resources/           # 配置文件
│   │   └── 📂 test/                    # 测试代码
│   └── 📄 pom.xml                      # Maven 配置
│
└── 📂 student-management-ui/            # 前端项目
    ├── 📂 src/
    │   ├── 📂 api/                     # API 接口
    │   ├── 📂 assets/                  # 静态资源
    │   ├── 📂 components/              # 公共组件
    │   ├── 📂 layout/                  # 布局组件
    │   ├── 📂 router/                  # 路由配置
    │   ├── 📂 utils/                   # 工具类
    │   └── 📂 views/                   # 页面组件
    ├── 📄 package.json                 # 项目配置
    └── 📄 vite.config.js               # Vite 配置
```

## 🚀 快速开始

### 1️⃣ 数据库配置
```sql
-- 创建数据库
CREATE DATABASE student_management;
```

### 2️⃣ 后端配置
1. 编辑 `src/main/resources/application.properties`：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

2. 启动后端服务：
```bash
cd springboot-students-manag-sys
mvn spring-boot:run
```

### 3️⃣ 前端配置
1. 安装依赖：
```bash
cd student-management-ui
npm install
```

2. 开发环境运行：
```bash
npm run dev
```

3. 生产环境构建：
```bash
npm run build
```

## 📚 API 文档

### 🔐 认证接口
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/auth/register` | 用户注册 |
| GET | `/api/auth/profile` | 获取用户信息 |

### 👨‍🎓 学生接口
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/students` | 获取学生列表 |
| GET | `/api/students/{id}` | 获取学生详情 |
| POST | `/api/students` | 新增学生 |
| PUT | `/api/students/{id}` | 更新学生信息 |
| DELETE | `/api/students/{id}` | 删除学生 |

### 👥 用户接口
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/users` | 获取用户列表 |
| GET | `/api/users/{id}` | 获取用户详情 |
| POST | `/api/users` | 新增用户 |
| PUT | `/api/users/{id}` | 更新用户信息 |
| DELETE | `/api/users/{id}` | 删除用户 |

## 🔑 用户注册
```json
POST /api/auth/register
{
    "username": "your_username",
    "password": "your_password"
}
```

## 👨‍💻 开发团队
- [sharkysharkblue](https://github.com/sharkysharkblue) - 全栈开发

## 📄 许可证
本项目采用 [MIT 许可证](LICENSE)。

## 🤝 贡献
欢迎提交问题和改进建议！ 