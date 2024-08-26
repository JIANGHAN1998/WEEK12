<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BHeader from './components/BHeader.vue'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push({ name: 'Login' })
}

const router = useRouter()
</script>

<template>
  <div>
    <BHeader />
    <main>
      <router-view />
    </main>
    <footer v-if="isAuthenticated">
      <button @click="logout">Logout</button>
    </footer>
  </div>
</template>

<style scoped>
footer {
  text-align: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
