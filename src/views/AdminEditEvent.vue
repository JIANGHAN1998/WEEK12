<template>
    <div>
      <h1>Edit Events</h1>
      <div v-if="!selectedEvent">
        <h2>Select an event to edit:</h2>
        <ul>
          <li v-for="event in events" :key="event.id">
            {{ event.name }} - {{ formatDate(event.date) }}
            <button @click="selectEvent(event)">Edit</button>
            <button @click="deleteEvent(event.id)">Delete</button>
          </li>
        </ul>
      </div>
  
      <div v-else>
        <h2>Edit Event</h2>
        <form @submit.prevent="updateEvent">
          <div>
            <label for="name">Event Name:</label>
            <input type="text" v-model="selectedEvent.name" id="name" required />
          </div>
          <div>
            <label for="date">Date:</label>
            <input type="date" v-model="selectedEvent.date" id="date" required />
          </div>
          <div>
            <label for="location">Location:</label>
            <input type="text" v-model="selectedEvent.location" id="location" required />
          </div>
          <button type="submit">Update Event</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  const events = ref([]);
  const selectedEvent = ref(null);
  
  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, 'events'));
    events.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  const selectEvent = (event) => {
    selectedEvent.value = { ...event };
  };
  
  const updateEvent = async () => {
    try {
      const eventRef = doc(db, 'events', selectedEvent.value.id);
      await updateDoc(eventRef, {
        name: selectedEvent.value.name,
        date: selectedEvent.value.date,
        location: selectedEvent.value.location,
      });
      alert('Event updated successfully!');
      selectedEvent.value = null;
      fetchEvents();
    } catch (e) {
      console.error('Error updating document: ', e);
      alert('Failed to update event, please try again!');
    }
  };
  
  const deleteEvent = async (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', eventId));
        alert('Event deleted successfully!');
        fetchEvents();
      } catch (e) {
        console.error('Error deleting document: ', e);
        alert('Failed to delete event, please try again!');
      }
    }
  };
  
  const cancelEdit = () => {
    selectedEvent.value = null;
  };
  
  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('en-US');
  };
  
  onMounted(() => {
    fetchEvents();
  });
  </script>
  