// store.ts
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.API_URL, {
  withCredentials: false,
})

export const useMainStore = defineStore('main', {
  state: () => ({
    room: null as any,
  }),
  getters: {
    deck: (state) => {
      if (state.room) {
        const { availableDecks, selectedDeck } = state.room
        return availableDecks[selectedDeck].cards
      }
      return []
    },
    room: (state) => state.room,
    members: (state) => state.room?.members || [],
    availableDecks: (state) => state.room?.availableDecks || [],
  },
  actions: {
    socket_pool(room: any) {
      this.room = room
    },
  },
})

export { socket }
