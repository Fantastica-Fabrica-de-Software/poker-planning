<template>
  <div id="room">
    <!-- Modal -->
    <div v-if="isOpen" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">Welcome to {{ routeParams.room }}</div>
        <div class="modal-body">
          <div class="form-control">
            <label class="form-label">Enter your name</label>
            <input v-model="name" @change="changeName" placeholder="Enter your name" class="input" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="button">Join</button>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="row spread">
      <h1>{{ routeParams.room }}</h1>
      <div class="header-right">
        <button @click="openModal" class="button">Your Name</button>
        <RoomSettings />
      </div>
    </header>

    <!-- Grid -->
    <div class="grid">
      <div class="table">
        <div class="row">
          <TableCard v-for="member in membersOnTable" :key="member.id" :member="member" />
        </div>
      </div>
      <div class="watchers">
        <ul class="rightFloat">
          <li v-if="watchers.length > 0">
            <span><i class="fa fa-eye"></i>{{ ' ' }}{{ watchers.length }} Watching</span>
          </li>
          <li v-for="member in members.filter((mem: { name: string }) => mem.name !== '')" :key="member.id">
            <span :class="{ b: member.id !== me.id }">
              <i class="fa fa-user"></i>
              <span v-if="member.name">{{ ' ' }}{{ member.name }}</span>
              <span v-else> Anonymous</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <Hand v-if="onTable" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store'
import Hand from '@/components/Hand.vue'
import RoomSettings from '@/components/RoomSettings.vue'
import TableCard from '@/components/TableCard.vue'

// Pinia store
const store = useMainStore()

// Route params
const route = useRoute()
const routeParams = route.params as { room: string }

// Local state
const isOpen = ref(true)
const name = ref('')

// Computed properties
const me = computed(() => store.members.find((mem: { id: any }) => mem.id === store.$socket.id))
const watchers = computed(() => store.members.filter((mem: { name: string }) => mem.name === ''))
const membersOnTable = computed(() => store.members.filter((mem: { card: null }) => mem.card != null))
const onTable = computed(() => me.value ? me.value.name !== '' : false)

// Methods
const changeName = () => {
  if (name.value) {
    store.$socket.emit('changeName', name.value)
  }
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  if (name.value) {
    isOpen.value = false
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
  padding-bottom: 2px;
}

.rightFloat {
  padding-left: 0;
  text-align: left;
  width: 180px;
}

.spread {
  margin-left: 5vw;
  justify-content: space-between;
}

#room {
  height: 100%;
  width: 100vw;
  padding: 0;
  display: grid;
  grid-template-rows: 64px auto 240px;
}

.table {
  display: grid;
  grid-template-columns: auto 150px;
  text-align: center;
  height: auto;
  width: 80vw;
  margin: 30px auto;
  border-radius: 150px;
  background: radial-gradient(circle, rgba(65,134,65,1) 0%, rgba(74,173,74,1) 35%, rgba(65,134,65,1) 100%);
  border: 15px solid rgb(142,75,75);
  box-shadow: 0 0 10px 5px rgba(0,0,0,0.3);
}

.table>.row {
  margin: auto;
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.modal-header,
.modal-body,
.modal-footer {
  padding: 10px;
}

.form-control {
  margin-bottom: 1em;
}

.form-label {
  display: block;
  margin-bottom: 0.5em;
}

.input {
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
  box-sizing: border-box;
}

.button {
  padding: 0.5em 1em;
  margin: 0.5em;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.header-right {
  display: flex;
  align-items: center;
}

.b {
  font-weight: bold;
}
</style>
