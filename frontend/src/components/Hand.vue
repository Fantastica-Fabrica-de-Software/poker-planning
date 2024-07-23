<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/Card.vue'
import { useMainStore } from '@/store'

const store = useMainStore()

const me = computed(() => {
  return store.members.find((mem) => mem.id == $socket.id)
})

const pickCard = (index: any) => {
  $socket.emit('pickCard', index)
}

const pickUp = () => {
  $socket.emit('pickCard', null)
}

const flipCard = () => {
  $socket.emit('flipCard')
}

const flipAll = () => {
  $socket.emit('flipAll')
}

const clearTable = () => {
  $socket.emit('clearTable')
}
</script>

<template>
  <div class="handContainer">
    <div class="handBts">
      <button @click="pickUp">Remove card</button>
      <button @click="flipAll">Show cards</button>
      <button @click="clearTable">New table</button>
    </div>
    <div class="hand">
      <Card
        v-for="(card, index) in store.deck"
        :key="index"
        :value="card"
        :active="index != me.card"
        @click.native="pickCard(index)"
      ></Card>
    </div>
  </div>
</template>

<style scoped>
.handContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.handBts {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 0px 30vw;
}

.handBts button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.handBts button:hover {
  background-color: #0056b3;
}

.hand {
  display: flex;
  justify-content: space-evenly;
  padding: 0px 20vw;
  transition-duration: 1s;
}

.card {
  transition-duration: 0.3s;
}

.card.active {
  background-color: #fa6800 !important;
}

.card:hover {
  transition-duration: 0.3s;
  transform: translate(0, -15px);
  cursor: pointer;
  background-color: #fa6800 !important;
}

.active {
  transform: translate(0, -15px);
}

.active::before {
  content: '';
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 10px;
  width: calc(100% - 6px);
  height: 10px;
}
</style>
