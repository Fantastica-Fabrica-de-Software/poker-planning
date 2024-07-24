<template>
  <div id="room">
    <modal :is-open="isOpen" @close="closeModal">
      <modal-content ref="content">
        <modal-header>Welcome to {{ roomName }}</modal-header>
        <modal-body>
          <div class="form-control">
            <label class="form-label">Enter your name</label>
            <input class="input" @change="changeName" placeholder="Enter your name" />
          </div>
        </modal-body>
        <modal-footer>
          <button class="button" @click="closeModal">Join</button>
        </modal-footer>
      </modal-content>
      <modal-overlay />
    </modal>
    <header class="row spread">
      <h1 class="header-text">{{ roomName }}</h1>
      <div class="button-container">
        <button class="button" @click="openModal">Your Name</button>
        <room-settings></room-settings>
      </div>
    </header>
    <div class="grid">
      <div class="grid-item table">
        <div class="row">
          <table-card v-for="member in membersOnTable" :key="member.id" :member="member"></table-card>
        </div>
      </div>
      <div class="grid-item watchers">
        <ul class="rightFloat">
          <li v-if="watchers.length > 0">
            <span><i class="fa fa-eye"></i> {{ watchers.length }} Watching</span>
          </li>
          <li v-for="member in filteredMembers" :key="member.id">
            <span :class="{ b: member.id === me.id }">
              <i class="fa fa-user"></i>
              <span v-if="member.name"> {{ member.name }}</span>
              <span v-else> Anonymous</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <hand v-if="onTable" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore, socketConnection } from '@/store';

interface Member {
  id: string;
  name: string;
  card?: any; // Replace 'any' with the appropriate type for 'card'
}

// Use the route to get the room parameter
const route = useRoute();
const roomName = ref(route.params.room);

// Use the Pinia store
const store = useMainStore();
const isOpen = ref(true);

onMounted(() => {
  // Join the room
  socketConnection.emit('join', roomName.value);

  // Listen for room updates
  socketConnection.on('roomUpdate', (room) => {
    store.socket_pool(room);
  });
});

// Cleanup socket listeners when the component is unmounted
onUnmounted(() => {
  socketConnection.off('roomUpdate');
});

// Computed properties to derive state from the store
const me = computed(() => store.members.find((mem: Member) => mem.id === socketConnection.id));
const watchers = computed(() => store.members.filter((mem: Member) => mem.name === ''));
const membersOnTable = computed(() => store.members.filter((mem: Member) => mem.card != null));
const filteredMembers = computed(() => store.members.filter((mem: Member) => mem.name !== ''));

const onTable = computed(() => {
  if (!me.value) {
    return false;
  }
  return me.value.name !== '';
});

// Methods to handle user interactions
const changeName = (event: Event) => {
  const name = (event.target as HTMLInputElement).value;
  socketConnection.emit('changeName', name);
};

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  if (me.value && me.value.name !== '') {
    isOpen.value = false;
  }
};
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
  justify-content: space-between !important;
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

.header-text {
  font-size: 2rem;
  font-weight: bold;
}

.button-container {
  width: 300px;
  display: flex;
  justify-content: flex-end;
}

.button {
  margin: 0 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.grid-item {
  margin: 1.25rem 0;
}
</style>
