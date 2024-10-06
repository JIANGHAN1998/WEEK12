<template>
    <div id="map-container">
      <!-- 搜索框，用于输入起点和终点 -->
      <SearchBox 
        @origin-selected="setOrigin"
        @destination-selected="setDestination"
      />
      <div ref="map" class="map"></div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import SearchBox from './SearchBox.vue';
  import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
  
  const directionsClient = mbxDirections({
    accessToken: 'pk.eyJ1Ijoic2hhZG93MTk5OCIsImEiOiJjbTF4a2NidTQwemtnMmpwZjZjc2FpeDk2In0.dENHZFdihxGHLfMd8QT8Sg'
  });
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93MTk5OCIsImEiOiJjbTF4a2NidTQwemtnMmpwZjZjc2FpeDk2In0.dENHZFdihxGHLfMd8QT8Sg';
  
  export default {
    name: 'MapView',
    components: {
      SearchBox,
    },
    data() {
      return {
        map: null,
        origin: null,
        destination: null,
        routeLayer: null,
      };
    },
    mounted() {
      this.initializeMap();
    },
    methods: {
      initializeMap() {
        if (this.map) return;
        this.map = new mapboxgl.Map({
          container: this.$refs.map,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [144.9631, -37.8136],  // Melbourne, Australia
          zoom: 10,
        });
  
        this.map.addControl(new mapboxgl.NavigationControl());
      },
      setOrigin(coordinates) {
        this.origin = coordinates;
        this.flyToLocation(coordinates);
        if (this.origin && this.destination) {
          this.getRoute(this.origin, this.destination);
        }
      },
      setDestination(coordinates) {
        this.destination = coordinates;
        this.flyToLocation(coordinates);
        if (this.origin && this.destination) {
          this.getRoute(this.origin, this.destination);
        }
      },
      flyToLocation(coordinates) {
        this.map.flyTo({
          center: coordinates,
          zoom: 14,
        });
      },
      getRoute(origin, destination) {
        // 使用 Mapbox Directions API 进行路径规划
        directionsClient
          .getDirections({
            profile: 'driving',
            waypoints: [
              {
                coordinates: origin,
              },
              {
                coordinates: destination,
              },
            ],
            geometries: 'geojson',
          })
          .send()
          .then((response) => {
            const route = response.body.routes[0].geometry;
  
            if (this.routeLayer) {
              this.map.removeLayer('route');
              this.map.removeSource('route');
            }
  
            this.map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: route,
              },
            });
  
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3b9ddd',
                'line-width': 6,
              },
            });
  
            this.routeLayer = true;
          })
          .catch((error) => {
            console.error('Error fetching directions:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  #map-container {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  </style>
  