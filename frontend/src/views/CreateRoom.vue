<template>
  <div id="form">
    <h1>Planning Poker</h1>
    <form @submit.prevent="joinRoom">
      <div class="form-control">
        <label for="roomName">Room name</label>
        <input
          id="roomName"
          v-model="roomNumber"
          placeholder="Enter room name"
          type="text"
          required
        />
      </div>
      <button
        :disabled="roomNumber === ''"
        type="submit"
      >Enter room</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const roomNumber = ref('')

const joinRoom = () => {
  if (roomNumber.value !== '') {
    return router.push({ name: 'Room', params: { room: roomNumber.value } })
  }
}
</script>

<style scoped>
#form {
  width: 400px;
  margin: auto;
  padding: 1em;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  animation-duration: 1s;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1em;
}

.form-control {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}
</style>

