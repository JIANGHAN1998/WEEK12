<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Welcome to Elderly Care</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="formData.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required />
          <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
        </div>
        <div class="form-group">
          <input type="checkbox" id="remember" v-model="formData.remember" />
          <label for="remember">Remember Me</label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="alternative-login">
        <button @click="register" class="register-button">Register</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 设置固定的用户名和密码
const correctUsername = 'admin'; // 固定用户名
const correctPassword = '123456'; // 固定密码

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  remember: false
})

const passwordError = ref(null)
const router = useRouter()

const login = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    passwordError.value = 'Passwords do not match!';
    return;
  }
  if (formData.value.username === correctUsername && formData.value.password === correctPassword) {
    passwordError.value = null;
    router.push('/home'); // 登录成功后跳转到HomeView
  } else {
    passwordError.value = 'Incorrect username or password!';
  }
}

const register = () => {
  router.push('/registrations'); // 点击注册按钮跳转到Registrations.vue
}
</script>

<style scoped>
/* 保持现有样式 */
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

.register-button {
  background-color: #07c160;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

@media (max-width: 576px) {
  .login-box {
    max-width: 90%;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .login-box {
    max-width: 60%;
  }
}

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
