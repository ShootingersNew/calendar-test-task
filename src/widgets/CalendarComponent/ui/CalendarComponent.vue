<template>
  <DateNavigationComponent v-model="dateToDisplay" />
  <DateSelectComponent v-model="selectedDate" :date-to-display="dateToDisplay" />
</template>
<script setup lang="ts">
import { DateSelectComponent } from '@/features/DateSelectComponent/ui'
import { DateNavigationComponent } from '@/features/DateNavigationComponent/ui'
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date(),
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: Date): void
  (e: 'on-date-select', newValue: Date): void
}>()
const dateToDisplay = ref<Date>(props.modelValue)
const selectedDate = computed<Date>({
  get: () => props.modelValue,
  set: (newDate: Date) => {
    emit('on-date-select', newDate)
    emit('update:modelValue', newDate)
  },
})
</script>
