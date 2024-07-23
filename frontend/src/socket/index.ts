import { io } from 'socket.io-client'

const socketConnection = io(import.meta.env.API_URL, {
  withCredentials: false,
})

export default socketConnection
