<template>
    <div class="container">
      <h1>Book Count API</h1>
      <div v-if="bookCountData">
        <pre>{{ bookCountData }}</pre> <!-- 使用 pre 标签格式化输出 JSON 数据 -->
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p> <!-- 显示错误信息 -->
      </div>
      <div v-else>
        <p>Loading data from API...</p> <!-- 加载提示 -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CountBookAPI',
    data() {
      return {
        bookCountData: null, // 存储 API 返回的 JSON 数据
        error: null, // 错误消息
      };
    },
    mounted() {
      // 组件挂载后自动调用 API
      this.getBookCountAPI();
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get('https://us-central1-week7-jianghan.cloudfunctions.net/countBooks'); // 使用提供的 Cloud Function URL
          this.bookCountData = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = 'Failed to fetch book count. Please try again later.';
        }
      }
    }
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
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  