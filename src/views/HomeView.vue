<template>
  <section class="hero-section">
    <div class="content">
      <h1>Welcome to GOLD-YEARS-CONNECT</h1>
      <p>Focusing on your senior lifestyle and health</p>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
};
</script>

<style scoped>
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0e0e0;
  text-align: center;
}

.content {
  max-width: 600px;
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

.explore-button {
  background-color: #00aaff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
