<script setup lang="ts">
const props = defineProps({
  value: String,
  active: Boolean,
});
</script>

<template>
  <div :class="props.active ? 'card active' : 'card'" class="container">
    <p class="text">{{ props.value }}</p>
  </div>
</template>

<style scoped>
.container {
  width: 90px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.card.active {
  background-color: #FA6800;
}

.card {
  background-color: #073293;
  color: #fff;
  transition-duration: 0.2s;
  border-radius: 10px;
}

.text {
  padding: 30px 0;
  font-size: 1.875rem; /* equivalent to 3xl */
  font-weight: bold;
  text-align: center;
}

.grow {
  cursor: pointer;
}
</style>
