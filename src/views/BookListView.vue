<template>
    <div>
      <h1>Books Ordered by ISBN (Descending)</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
  import db from '../firebase/init.js'
  
  const books = ref([])
  
  const queryOrderByIsbnDescending = async () => {
    try {
      const q = query(collection(db, 'books'), orderBy('isbn', 'desc'), limit(3)) // 查询条件
      const querySnapshot = await getDocs(q)
      const booksArray = []
  
      querySnapshot.forEach((doc) => {
        booksArray.push({ id: doc.id, ...doc.data() })
      })
  
      books.value = booksArray
      console.log('booksArray', booksArray)
    } catch (error) {
      console.error('Error fetching books: ', error)
    }
  }
  
  onMounted(() => {
    queryOrderByIsbnDescending()
  })
  </script>
  