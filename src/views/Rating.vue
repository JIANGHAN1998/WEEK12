<template>
    <div class="wrapper">
      <span v-for="star in totalRating" :key="star" class="star" :class="{ filled: star <= value }" @click="setRating(star)">★</span>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps<{
    value: number;
    totalRating: number;
  }>();
  
  const emit = defineEmits<(event: "update-rating", value: number) => void>();
  
  const setRating = (star: number) => {
    emit("update-rating", star);
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  
  .star {
    cursor: pointer;
    color: #d8d8d8;
  }
  
  .star:hover,
  .star:active,
  .star.filled {
    color: orange;
  }
  </style>
  