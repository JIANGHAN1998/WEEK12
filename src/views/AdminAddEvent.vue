<template>
    <div>
      <h1>Add Event</h1>
      <form @submit.prevent="addEvent">
        <div>
          <label for="name">Event Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" v-model="date" id="date" required />
        </div>
        <div>
          <label for="location">Location:</label>
          <input type="text" v-model="location" id="location" required />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { collection, addDoc } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  const name = ref('');
  const date = ref('');
  const location = ref('');
  
  const addEvent = async () => {
    try {
      if (!name.value || !date.value || !location.value) {
        alert('All fields are required!');
        return;
      }
  
      await addDoc(collection(db, 'events'), {
        name: name.value,
        date: date.value,
        location: location.value,
      });
  
      alert('Event added successfully!');
  
      // 重置表单
      name.value = '';
      date.value = '';
      location.value = '';
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to add event, please try again!');
    }
  };
  </script>
  