<template>
  <div class="container">
    <header class="d-flex justify-content-between py-3">
      <ul class="nav nav-pills">
      </ul>
    </header>
    <div>
      <h1>Administrator's Operating Catalogue</h1>
      <p>Welcome back, honourable administrator.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped>
.nav-link.active {
  background-color: #007bff;
  color: white;
}

</style>
