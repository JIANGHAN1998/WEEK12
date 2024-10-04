<template>
    <div>
      <h1>Edit Book</h1>
      <form @submit.prevent="editBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input v-model="name" id="name" required />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { collection, doc, getDocs, updateDoc, where, query } from 'firebase/firestore'
  import db from '../firebase/init.js'
  
  const isbn = ref('')
  const name = ref('')
  const refId = ref('')
  const route = useRoute()
  const router = useRouter()
  
  const fetchBook = async () => {
    try {
      const bookId = route.params.bookId
      const q = query(collection(db, 'books'), where('isbn', '==', parseInt(bookId)))
      const querySnapshot = await getDocs(q)
  
      if (querySnapshot?.docs?.length) {
        const bookData = querySnapshot.docs[0].data()
        isbn.value = bookData.isbn
        name.value = bookData.name
        refId.value = querySnapshot.docs[0].id
      }
    } catch (error) {
      console.error('Error fetching book: ', error)
    }
  }
  
  const editBook = async () => {
    try {
      await updateDoc(doc(db, 'books', refId.value), {
        isbn: Number(isbn.value),
        name: name.value,
      })
      alert('Book updated successfully')
      router.push({ name: 'BookList' })
    } catch (error) {
      console.error('Error updating book: ', error)
    }
  }
  
  onMounted(fetchBook)
  </script>
  