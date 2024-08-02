<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="w-1/3 p-5 bg-white rounded-2xl shadow-lg">
      <div class="flex flex-col items-center">
        <h2 class="mb-5 text-2xl text-gray-500">{{ 'Invite your team' }}</h2>
        <div class="flex flex-col items-center gap-4">
          <button v-if="!showQRCode" @click="showQR()" class="w-80 h-20 flex items-center px-5 bg-gray-100 rounded-full shadow-md hover:opacity-30 active:shadow-inner">
            <span class="ml-5 text-2xl font-semibold text-gray-800">QR Code</span>
          </button>
          <button v-if="!showQRCode" @click="copyLink()" class="w-80 h-20 flex items-center px-5 bg-gray-100 rounded-full shadow-md hover:opacity-30 active:shadow-inner">
            <span class="ml-5 text-2xl font-semibold text-gray-800">Copy to Clipboard</span>
          </button>
          <div v-if="showQRCode">
            <qrcode-vue :value="value" :level="level" :render-as="renderAs" />
          </div>
          <button @click="close()" class="w-80 h-20 flex items-center px-5 bg-gray-100 rounded-full shadow-md hover:opacity-30 active:shadow-inner">
            <span class="ml-5 text-2xl font-semibold text-gray-800">Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import QrcodeVue, { type Level, type RenderAs } from 'qrcode.vue'

const value = ref('')
const showQRCode = ref(false)
const level = ref<Level>('H')
const renderAs = ref<RenderAs>('svg')

const emit = defineEmits(['dismissModal'])

async function showQR() {
  value.value = window.location.href
  showQRCode.value = true
}

function close() {
  showQRCode.value = false
  emit('dismissModal')
}

async function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  close()
}
</script>