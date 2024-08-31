<template>
  <div class="feedback-container">
    <h2>We value your feedback!</h2>
    <form @submit.prevent="submitFeedback">
      <div v-for="(question, index) in questions" :key="index" class="question-item">
        <p>{{ question }}</p>
        <Rating :value="ratings[index]" :total-rating="10" @update-rating="updateRating(index, $event)" />
        <p>Your rating: {{ ratings[index] }}</p>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
    <div v-if="averageRating !== null" class="average-rating">
      <h3>Average Rating: {{ averageRating }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Rating from './Rating.vue';

const questions = ref([
  'How is your user experience?',
  'Was the service we provided helpful to you?',
  'How useful do you find the Health Management resources?',
  'How engaged do you feel in our Community Activities?',
  'How helpful is the Financial Assistance information provided?'
]);

const ratings = ref(Array(questions.value.length).fill(0));

const updateRating = (index, rating) => {
  ratings.value[index] = rating;
};

const averageRating = computed(() => {
  const total = ratings.value.reduce((acc, rating) => acc + rating, 0);
  return total > 0 ? (total / ratings.value.length).toFixed(1) : null;
});

const submitFeedback = () => {
  console.log('Feedback submitted:', ratings.value);
  alert('Thank you for your feedback!');
};
</script>

<style scoped>
.feedback-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.question-item {
  margin-bottom: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.average-rating {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
