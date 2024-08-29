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
      </ul>
      <button v-if="$route.name !== 'Login'" @click="goToLogin" class="logout-button">Login</button>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')  // 这里的 '/login' 会导航到 `LoginView.vue`，如上配置
}
</script>

<style scoped>
.nav-link.active {
  background-color: #007bff;
  color: white;
}

.logout-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
}

.logout-button:hover {
  background-color: #0056b3;
}
</style>
