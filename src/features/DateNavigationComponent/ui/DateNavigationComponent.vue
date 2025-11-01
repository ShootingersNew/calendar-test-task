<template>
  <div class="navs">
    <div class="button" @click="navigate(-1)">prev</div>
    <div>{{ displayedDate }}</div>
    <div class="button" @click="navigate(1)">next</div>
  </div>
  <div class="locale button" @click="emit('switch-locale')">Переключить локаль</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    required: true,
  },
  selectedLocale: {
    type: String,
    required: false,
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', newDate: Date): void
  (e: 'switch-locale'): void
}>()

const displayedDate = computed({
  get: () =>
    props.modelValue.toLocaleDateString(props.selectedLocale || 'en-US', {
      month: 'long',
      year: 'numeric',
    }),
  set: (newDate: Date) => {
    emit('update:modelValue', newDate)
  },
})

const navigate = (direction: number) => {
  const newDate = props.modelValue
  displayedDate.value = new Date(newDate.getFullYear(), newDate.getMonth() + direction, 1)
}
</script>

<style scoped>
.navs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
  gap: 5px;
}
.button {
  padding: 4px 8px;
  border: 1px solid pink;
  border-radius: 4px;
  cursor: pointer;
}
.button:hover {
  background-color: pink;
}
</style>
