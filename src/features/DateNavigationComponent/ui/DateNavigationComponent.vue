<template>
  <div @click="navigate(-1)">left</div>
  <div>{{ displayedDate }}</div>
  <div @click="navigate(1)">right</div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    required: true,
  },
})
const emit = defineEmits<{ (e: 'update:modelValue', newDate: Date): void }>()
const displayedDate = computed({
  get: () =>
    props.modelValue.toLocaleDateString('en-US', {
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
