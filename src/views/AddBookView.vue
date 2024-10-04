<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <!-- 显示书籍列表 -->
    <BookListView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import BookListView from './BookListView.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    if (!isbn.value || !name.value) {
      alert('Both ISBN and Name are required fields!')
      return
    }

    await addDoc(collection(db, 'books'), {
      isbn: isbn.value,
      name: name.value
    })

    alert('Book added successfully!')

    // 重置输入框
    isbn.value = ''
    name.value = ''
  } catch (e) {
    console.error('Error adding document: ', e)
    alert('Failed to add book, please try again!')
  }
}
</script>
