<template>
    <div class="login-container">
      <nav class="navbar">
        <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
      </nav>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const router = useRouter()
  
  const handleLogin = () => {
    if (username.value === 'admin' && password.value === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push({ name: 'Home' })
    } else {
      window.alert('Invalid credentials')
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .nav-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .nav-link.active {
    color: #0056b3;
    font-weight: bold;
  }
  
  button {
    display: block;
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  