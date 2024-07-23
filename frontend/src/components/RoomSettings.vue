<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMainStore } from '@/store'

const store = useMainStore()

const isOpen = ref(false)

const changeDeck = (event: any) => {
  const newDeckIndex = event.target.value
  store.changeDeck(newDeckIndex)
}

const availableDecks = computed(() => store.availableDecks)
const selectedDeck = computed(() => store.room?.selectedDeck ?? 0)

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <div>
    <button aria-label="Open settings" @click="isOpen = true" class="icon-button">
      <i class="fa fa-chevron-left"></i>
    </button>

    <div v-if="isOpen" class="drawer">
      <div class="drawer-overlay" @click="close"></div>
      <div class="drawer-content">
        <button @click="close" class="drawer-close-button">&times;</button>
        <h2 class="drawer-header">Room settings</h2>

        <div class="drawer-body">
          <select @change="changeDeck" class="select" :value="selectedDeck.toString()">
            <option v-for="(item, index) in availableDecks" :key="index" :value="index">
              {{ `${item.name} (${item.cards})` }}
            </option>
          </select>
        </div>

        <div class="drawer-footer">
          <button @click="close" class="button">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}

.drawer-content {
  padding: 1em;
  overflow-y: auto;
  flex-grow: 1;
}

.drawer-close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
}

.drawer-header {
  font-size: 1.5rem;
  margin-bottom: 1em;
}

.drawer-body {
  flex-grow: 1;
}

.select {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}
</style>

