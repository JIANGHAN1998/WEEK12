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
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/firebase-register" class="nav-link" active-class="active">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Event Listings</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book API</router-link>
        </li>
        <!-- New Map link -->
        <li class="nav-item">
          <router-link to="/map" class="nav-link" active-class="active">Map</router-link>
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
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()
const isAuthenticated = ref(false)

const router = useRouter()

auth.onAuthStateChanged(user => {
  isAuthenticated.value = !!user
})

const goToLogin = () => {
  router.push('/FireLogin')
}

const logout = () => {
  signOut(auth)
    .then(() => {
      isAuthenticated.value = false
      router.push('/home')
      alert('Logout successful')
      console.log('Firebase logout successful!')
    })
    .catch((error) => {
      console.error('An error happened during logout:', error)
    })
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
