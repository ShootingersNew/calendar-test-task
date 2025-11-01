<template>
  <div class="navs">
    <div @click="navigate(-1)">prev</div>
    <div>{{ displayedDate }}</div>
    <div @click="navigate(1)">next</div>
  </div>
  <div class="locale" @click="emit('switch-locale')">Переключить локаль</div>
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
