<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null, // 用于保存获取到的书籍数量
        error: null, // 用于保存错误信息
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://us-central1-week7-jianghan.cloudfunctions.net/countBooks'); // 替换为你自己的 Cloud Function API URL
          this.count = response.data.count; // 假设 API 返回的数据格式为 { count: xxx }
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = 'Error fetching book count'; // 错误时显示的消息
          this.count = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #app {
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
  
  p {
    font-size: 1.2rem;
    margin-top: 20px;
  }
  
  p.error {
    color: red;
  }
  </style>
  