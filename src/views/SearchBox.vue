<template>
    <div class="search-box">
      <!-- 起点输入框 -->
      <input
        type="text"
        v-model="originQuery"
        @keyup.enter="searchOrigin"
        placeholder="Enter origin"
      />
      <ul v-if="originResults.length">
        <li v-for="place in originResults" :key="place.id" @click="selectOrigin(place)">
          {{ place.place_name }}
        </li>
      </ul>
  
      <!-- 终点输入框 -->
      <input
        type="text"
        v-model="destinationQuery"
        @keyup.enter="searchDestination"
        placeholder="Enter destination"
      />
      <ul v-if="destinationResults.length">
        <li v-for="place in destinationResults" :key="place.id" @click="selectDestination(place)">
          {{ place.place_name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
  
  const geocodingClient = mbxGeocoding({
    accessToken: 'pk.eyJ1Ijoic2hhZG93MTk5OCIsImEiOiJjbTF4azZ3bXMxMDB6MmlvZWF4MnhrNGIzIn0.ot5OetdBh9ZqDgFA6VwL6w'
  });
  
  export default {
    data() {
      return {
        originQuery: '',
        destinationQuery: '',
        originResults: [],
        destinationResults: [],
      };
    },
    methods: {
      searchOrigin() {
        if (this.originQuery.length > 0) {
          geocodingClient
            .forwardGeocode({
              query: this.originQuery,
              limit: 5,
            })
            .send()
            .then((response) => {
              this.originResults = response.body.features;
            });
        } else {
          this.originResults = [];
        }
      },
      searchDestination() {
        if (this.destinationQuery.length > 0) {
          geocodingClient
            .forwardGeocode({
              query: this.destinationQuery,
              limit: 5,
            })
            .send()
            .then((response) => {
              this.destinationResults = response.body.features;
            });
        } else {
          this.destinationResults = [];
        }
      },
      selectOrigin(place) {
        this.$emit('origin-selected', place.center); // 返回起点坐标
        this.originResults = [];
        this.originQuery = place.place_name;
      },
      selectDestination(place) {
        this.$emit('destination-selected', place.center); // 返回终点坐标
        this.destinationResults = [];
        this.destinationQuery = place.place_name;
      },
    },
  };
  </script>
  
  <style>
  .search-box {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
  .search-box input {
    width: 300px;
    padding: 5px;
    margin-bottom: 10px;
  }
  .search-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
    max-height: 200px;
    overflow-y: auto;
  }
  .search-box li {
    padding: 5px;
    cursor: pointer;
  }
  .search-box li:hover {
    background: #eee;
  }
  </style>
  