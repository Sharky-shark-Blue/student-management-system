-- 创建数据库
CREATE DATABASE IF NOT EXISTS student_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE student_management;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    name VARCHAR(50) COMMENT '姓名',
    email VARCHAR(100) COMMENT '邮箱',
    is_admin BOOLEAN DEFAULT FALSE COMMENT '是否是管理员',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 创建学生表
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    student_number VARCHAR(20) NOT NULL UNIQUE COMMENT '学号',
    age INT COMMENT '年龄',
    gender VARCHAR(10) COMMENT '性别',
    grade VARCHAR(20) COMMENT '年级',
    major VARCHAR(50) COMMENT '专业',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    address TEXT COMMENT '地址',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生表';


-- 插入测试学生数据
INSERT INTO students (name, student_number, age, gender, grade, major, phone, email, address) VALUES
('张三', '2024001', 20, '男', '大二', '计算机科学', '13800138001', 'zhangsan@example.com', 'test'),
('李四', '2024002', 19, '女', '大一', '软件工程', '13800138002', 'lisi@example.com', 'test'),
('王五', '2024003', 21, '男', '大三', '人工智能', '13800138003', 'wangwu@example.com', 'test'),
('赵六', '2024004', 20, '女', '大二', '数据科学', '13800138004', 'zhaoliu@example.com', 'test');

-- 创建索引
CREATE INDEX idx_student_number ON students(student_number);
CREATE INDEX idx_username ON users(username); 