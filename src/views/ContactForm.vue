<template>
  <div class="contact-container" lang="en">
    <div class="contact-header">
      <h1>Contact Us</h1>
    </div>
    <form @submit.prevent="sendEmail" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="formData.name" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="formData.email" id="email" required />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="formData.message" id="message" required></textarea>
      </div>
      <div class="form-group">
        <label for="file">Attachment:</label>
        <input type="file" @change="handleFileUpload" multiple />
      </div>
      <button type="submit">Send Message</button>
    </form>
    <p v-if="emailSent">Email sent successfully!</p>
    <p v-if="emailError">There was an error sending the email. Please try again later.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      attachments: [], // To store uploaded files
      emailSent: false,
      emailError: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.attachments = event.target.files;
    },
    async sendEmail() {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('email', this.formData.email);
      formData.append('message', this.formData.message);

      // Append attachments to formData
      for (let i = 0; i < this.attachments.length; i++) {
        formData.append('attachments', this.attachments[i]);
      }

      try {
        const response = await axios.post('http://localhost:3000/send-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          this.emailSent = true;
          this.emailError = false;
          this.formData = { name: '', email: '', message: '' };
          this.attachments = [];
        }
      } catch (error) {
        this.emailError = true;
        console.error('Error sending email: ', error);
      }
    },
  },
};
</script>

<style scoped>
.contact-container {
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.contact-header {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  color: green;
}
</style>
