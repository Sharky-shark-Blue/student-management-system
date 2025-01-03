<template>
  <router-view></router-view>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  height: 100%;
}

/* 重置 Element Plus 的一些默认样式 */
.el-button {
  font-weight: 500;
}

.el-input__wrapper {
  background-color: #f5f7fa;
}

.el-input__inner {
  height: 40px;
  line-height: 40px;
}

.el-card {
  --el-card-padding: 20px;
}

.el-card__header {
  padding: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
