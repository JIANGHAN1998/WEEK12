<template>
  <div class="admin-dashboard">
    <h1>Administrator's Operating Catalogue</h1>
    <p>Welcome back, honourable administrator.</p>
    <div class="actions">
      <button @click="handleUserManagement">User Management</button>
      <button @click="handleSystemSettings">System Settings</button>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    handleUserManagement() {
      alert('User Management clicked');
    },
    handleSystemSettings() {
      alert('System Settings clicked');
    },
    handleLogout() {
      alert('Logged out successfully');
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
