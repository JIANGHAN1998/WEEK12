<template>
    <div class="container">
      <h1>Book Count API</h1>
      <div v-if="bookCountData">
        <pre>{{ bookCountData }}</pre> 
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p> 
      </div>
      <div v-else>
        <p>Loading data from API...</p> 
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CountBookAPI',
    data() {
      return {
        bookCountData: null, 
        error: null, 
      };
    },
    mounted() {
      
      this.getBookCountAPI();
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get('https://us-central1-week7-jianghan.cloudfunctions.net/countBooks'); 
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
  