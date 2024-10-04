<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BHeader from './components/BHeader.vue'; // 引入 BHeader 组件

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
const router = useRouter();
const route = useRoute();

// 用于处理退出登录
const logout = () => {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  router.push({ name: 'Login' });
};

// 根据路由名称判断是否显示头部
const showHeader = computed(() => {
  return route.name !== 'CountBookAPI'; // 当路由名称不是 CountBookAPI 时，显示头部
});
</script>

<template>
  <div>
    <!-- 使用 v-if 动态显示头部 -->
    <BHeader v-if="showHeader" />

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
