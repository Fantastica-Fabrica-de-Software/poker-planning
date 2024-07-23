<script setup lang="ts">
import { computed, inject } from 'vue'
import { useMainStore } from '@/store'

interface Member {
  id: string
  name: string
  card: number
  hidden: boolean
}

defineProps<{ member: Member }>()

const store = useMainStore()
const socket = inject<any>('$socket')

const me = computed(() => {
  return store.members.find((mem: any) => mem.id == socket?.id)
})

const deck = computed(() => store.deck)
</script>

<template>
  <div :key="member.id">
    <div :class="['box', member.hidden ? '' : 'animate__animated animate__flipInY']">
      <div class="text-content">
        <span v-if="member.hidden"> ‎ </span>
        <span v-else>
          {{ deck[member.card] }}
        </span>
      </div>
    </div>
    <div class="member-info">
      <i class="fa fa-user"></i>
      <span :class="member.id !== me.id || 'b'">
        {{ member.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.box {
  background-color: #FA6800;
  width: 90px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 1s;
}

.text-content {
  padding: 30px 0;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
}

.member-info {
  margin-top: 1em;
  padding: 5px 3px;
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.fa-user {
  margin-right: 5px;
}

.b {
  font-weight: bold;
}

.mini {
  margin: 0px auto;
  font-size: 1em !important;
}
</style>
