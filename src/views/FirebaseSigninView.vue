<template>
  <div class="login-container">
    <h1>User Login</h1>

    <div class="input-group">
      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Enter your email"
        class="input-field"
      />
    </div>

    <div class="input-group">
      <label for="password">Password:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        class="input-field"
      />
    </div>

    <div class="button-group">
      <button @click="loginUser" class="user-button">User Login</button>
      <button @click="loginAdmin" class="admin-button">Admin Login</button>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const router = useRouter()
const auth = getAuth()
const loginUser = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("User logged in successfully!")
      router.push("/userDashboard") 
    })
    .catch((error) => {
      console.error("Login failed:", error.message)
      errorMessage.value = `Login failed: ${error.message}`
    })
}
const loginAdmin = () => {
  if (email.value === "admin@163.com" && password.value === "123456") {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Admin logged in successfully!")
        router.push("/adminDashboard") 
      })
      .catch((error) => {
        console.error("Admin login failed:", error.message)
        errorMessage.value = `Admin login failed: ${error.message}`
      })
  } else {
    errorMessage.value = "Admin login failed: Invalid credentials"
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.user-button {
  width: 48%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-button:hover {
  background-color: #0056b3;
}

.admin-button {
  width: 48%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
