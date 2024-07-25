import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { socket } from './store'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$socket = socket
app.use(pinia)
app.use(router)
app.mount('#app')
