<template>
  <div class="container">
    <header class="d-flex justify-content-between py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
      </ul>
      <button v-if="$route.name !== 'Login'" @click="$emit('logout')" class="logout-button">Logout</button>
    </header>
  </div>
</template>

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
