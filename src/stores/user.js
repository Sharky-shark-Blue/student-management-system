import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({
    id: null,
    username: '',
    name: '',
    email: '',
    isAdmin: false
  })

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUserInfo(info) {
    userInfo.value = info
  }

  function clearUserInfo() {
    token.value = ''
    userInfo.value = {
      id: null,
      username: '',
      name: '',
      email: '',
      isAdmin: false
    }
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    setToken,
    setUserInfo,
    clearUserInfo
  }
})
