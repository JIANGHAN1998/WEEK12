<template>
    <div class="register-container">
      <h1>Create an Account</h1>
      
      <!-- Email Input -->
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
      
      <!-- Password Input -->
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
  
      <!-- Confirm Password Input -->
      <div class="input-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          class="input-field"
        />
        <p v-if="passwordError" class="error-message">Passwords do not match!</p>
      </div>
  
      <!-- Save Button -->
      <div class="button-group">
        <button @click="register" class="submit-button">Save to Firebase</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref("")
  const password = ref("")
  const confirmPassword = ref("")
  const passwordError = ref(false)
  const router = useRouter()
  const auth = getAuth()
  
  const register = () => {
    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      passwordError.value = true
      return
    }
    
    // Clear the error if passwords match
    passwordError.value = false
  
    // Proceed with Firebase registration
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log("Firebase Register Successful!", userCredential)
        router.push("/FireLogin")
      })
      .catch((error) => {
        console.error("Error during registration:", error.message)
        alert(`Registration failed: ${error.message}`)
      })
  }
  </script>
  
  <style scoped>
  .register-container {
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
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px 0;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  