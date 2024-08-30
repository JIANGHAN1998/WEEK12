<template>
  <div class="container">
    <header class="d-flex justify-content-between py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/feedback" class="nav-link" active-class="active">Feedback</router-link>
        </li>
      </ul>
      <div class="contact-info">
        <span>Contact Us +61 0000000000</span>
      </div>
      <button v-if="isAuthenticated" @click="logout" class="logout-button">Logout</button>
      <button v-else @click="goToLogin" class="login-button">Login</button>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const logout = () => {
  localStorage.setItem('isAuthenticated', 'false')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<style scoped>
.nav-link.active {
  background-color: #007bff;
  color: white;
}

.login-button,
.logout-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; 
}

.logout-button:hover,
.login-button:hover {
  background-color: #0056b3;
}

.contact-info {
  margin-right: 10px; 
  font-weight: bold;
  font-size: 1rem;
  align-self: center; 
}
</style>
