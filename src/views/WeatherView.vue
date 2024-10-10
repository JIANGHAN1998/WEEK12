<template>
    <div class="container">
      <h1>Weather API</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" />
        <button @click="searchByCity">Search</button>
      </div>
  
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
          <p>{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
  
      <div v-else-if="error">
        <p>{{ error }}</p> 
      </div>
  
      <div v-else>
        <p>Loading weather data...</p> 
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const apikey = 'a059a2adaf021170d9bf47a0978a3fc6'; 
  const city = ref('');
  const weatherData = ref(null);
  const iconUrl = ref('');
  const temperature = ref(null);
  const error = ref(null);
  
  const searchByCity = async () => {
    try {
      const responseLocation = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apikey}`
      );
  
      if (responseLocation.data.length === 0) {
        throw new Error('City not found. Please enter a valid city name.');
      }
  
      const lat = responseLocation.data[0].lat;
      const lon = responseLocation.data[0].lon;
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
      const responseWeather = await axios.get(weatherUrl);
  
      weatherData.value = responseWeather.data;
      iconUrl.value = `http://openweathermap.org/img/w/${responseWeather.data.weather[0].icon}.png`;
      temperature.value = responseWeather.data.main.temp;
      error.value = null; 
    } catch (err) {
      console.error('Error fetching weather data:', err);
      error.value = err.message || 'Failed to fetch weather data. Please try again later.';
      weatherData.value = null; 
    }
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  input {
    padding: 8px;
    font-size: 16px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  img {
    width: 50px;
    height: 50px;
  }
  
  p {
    font-size: 18px;
    margin: 5px;
  }
  </style>
  