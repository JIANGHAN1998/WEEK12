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
  name: 'HomeView',
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    }
  }
};
</script>

<style scoped>
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #e0e0e0;
  text-align: center;
}

.content {
  max-width: 800px;
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 40px;
}

.sitemap-navigation {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.sitemap-item {
  background-color: #007bff;
  color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  transition: background-color 0.3s;
}

.sitemap-item:hover {
  background-color: #0056b3;
}

h2 {
  margin: 0;
  font-size: 20px;
}
</style>
