import { createRouter, createWebHistory } from 'vue-router'
import CreateRoom from '@/views/CreateRoom.vue'
import Room from '@/views/Room.vue'

const routes = [
  { name: 'CreateRoom', path: '/', component: CreateRoom },
  { name: 'Room', path: '/r/:room', component: Room }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
