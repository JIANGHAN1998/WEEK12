<template>
    <div class="directions">
      <h3>导航</h3>
      <p>起点：{{ originName }}</p>
      <p>终点：{{ destinationName }}</p>
      <ul>
        <li v-for="(step, index) in steps" :key="index">
          {{ step.maneuver.instruction }}
        </li>
      </ul>
      <button @click="closeDirections">关闭导航</button>
    </div>
  </template>
  
  <script>
  import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
  import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
  
  const geocodingClient = mbxGeocoding({
    accessToken: 'pk.eyJ1Ijoic2hhZG93MTk5OCIsImEiOiJjbTF4azZ3bXMxMDB6MmlvZWF4MnhrNGIzIn0.ot5OetdBh9ZqDgFA6VwL6w',
  });
  const directionsClient = mbxDirections({
    accessToken: 'pk.eyJ1Ijoic2hhZG93MTk5OCIsImEiOiJjbTF4azZ3bXMxMDB6MmlvZWF4MnhrNGIzIn0.ot5OetdBh9ZqDgFA6VwL6w',
  });
  
  export default {
    name: 'Directions',
    props: ['origin', 'destination'],
    data() {
      return {
        originName: '',
        destinationName: '',
        steps: [],
      };
    },
    mounted() {
      this.getPlaceNames();
      this.getDirections();
    },
    methods: {
      getPlaceNames() {
        geocodingClient
          .reverseGeocode({
            query: this.origin,
            limit: 1,
          })
          .send()
          .then((response) => {
            this.originName = response.body.features[0].place_name;
          });
  
        geocodingClient
          .reverseGeocode({
            query: this.destination,
            limit: 1,
          })
          .send()
          .then((response) => {
            this.destinationName = response.body.features[0].place_name;
          });
      },
      getDirections() {
        directionsClient
          .getDirections({
            profile: 'driving',
            waypoints: [
              { coordinates: this.origin },
              { coordinates: this.destination },
            ],
            geometries: 'geojson',
          })
          .send()
          .then((response) => {
            const directionsData = response.body.routes[0];
            this.steps = directionsData.legs[0].steps;
            this.$emit('draw-route', directionsData.geometry);
          });
      },
      closeDirections() {
        this.$emit('close-directions');
      },
    },
  };
  </script>
  
  <style>
  .directions {
    position: absolute;
    top: 100px;
    left: 50px;
    background: white;
    padding: 10px;
    z-index: 1;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
  }
  .directions h3 {
    margin-top: 0;
  }
  .directions ul {
    list-style: none;
    padding: 0;
  }
  .directions li {
    margin-bottom: 5px;
  }
  </style>
  