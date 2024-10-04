<template>
    <div class="container">
      <h1>All Books API</h1>
      <div v-if="bookData && bookData.length">
        <pre>{{ formattedBookData }}</pre>
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <p>Loading book data from API...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  
  export default {
    name: 'GetAllBookAPI',
    setup() {
      const bookData = ref([]); // 初始化为空数组
      const error = ref(null); // 错误信息
  
      const getAllBooks = async () => {
        try {
          console.log('Fetching book data...');
          const response = await axios.get(
            'https://us-central1-week7-jianghan.cloudfunctions.net/getAllBooks' // 更新为您的函数 URL
          );
          console.log('Response data:', response.data); // 打印响应数据
          bookData.value = response.data; // 设置书籍数据
          error.value = null; // 清除错误信息
        } catch (err) {
          console.error('Error fetching book data:', err);
          error.value = 'Failed to fetch book data. Please try again later.'; // 设置错误信息
        }
      };
  
      onMounted(getAllBooks); // 组件挂载时调用
  
      const formattedBookData = computed(() => {
        return JSON.stringify(bookData.value, null, 2);
      });
  
      return { bookData, error, formattedBookData }; // 返回数据和错误
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 20px;
  }
  
  pre {
    text-align: left;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
  }
  </style>
  