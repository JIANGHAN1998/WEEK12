<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Welcome to Elderly Care</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="formData.username" required />
          <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required />
          <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required />
          <div v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</div>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="alternative-login">
        <button @click="register" class="register-button">Register</button>
        <button @click="adminLogin" class="admin-button">Admin Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const correctUsername = 'user'
const correctPassword = '123456'


const adminUsername = 'admin'
const adminPassword = '0123456'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const usernameError = ref(null)
const passwordError = ref(null)
const confirmPasswordError = ref(null)
const router = useRouter()
//XSS
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const validateFields = () => {
  usernameError.value = null
  passwordError.value = null
  confirmPasswordError.value = null

  // 使用防止XSS攻击的转义函数来处理用户输入
  const sanitizedUsername = escapeHtml(formData.value.username);
  const sanitizedPassword = escapeHtml(formData.value.password);

  if (!sanitizedUsername) {
    usernameError.value = 'Please enter your account.'
  }
  if (!sanitizedPassword) {
    passwordError.value = 'Please enter your password.'
  }
  if (sanitizedPassword !== formData.value.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match!'
  }
  
  return !usernameError.value && !passwordError.value && !confirmPasswordError.value
}

const login = () => {
  if (!validateFields()) {
    return
  }


  if (formData.value.username === adminUsername && formData.value.password === adminPassword) {
    passwordError.value = 'Incorrect login method for admin account!'
    router.push('/access-denied')
    return
  }

  if (formData.value.username === correctUsername && formData.value.password === correctPassword) {
    localStorage.setItem('isAuthenticated', 'true') 
    router.push('/home') 
  } else {
    passwordError.value = 'Incorrect username or password!'
    router.push('/access-denied') 
  }
}

const register = () => {
  router.push('/register') 
}

const adminLogin = () => {
  if (!validateFields()) {
    return
  }

  if (formData.value.username === adminUsername && formData.value.password === adminPassword) {
    localStorage.setItem('isAuthenticated', 'true') 
    router.push('/manager') 
  } else {
    passwordError.value = 'Incorrect admin username or password!'
    router.push('/access-denied') 
  }
}
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.text-danger {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

.forgot-password {
  float: right;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.alternative-login {
  text-align: center;
  margin-top: 20px;
}

.register-button,
.admin-button {
  background-color: #07c160;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.admin-button {
  background-color: #007bff;
}

@media (max-width: 576px) {
  .login-box {
    max-width: 90%;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .login-box {
    max-width: 60%;
  }}

@media (min-width: 992px) and (max-width: 1200px) {
  .login-box {
    max-width: 50%;
  }
}

@media (min-width: 1200px) {
  .login-box {
    max-width: 40%;
  }
}
</style>
