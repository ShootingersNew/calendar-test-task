<script setup lang="ts">
import { CalendarComponent } from './widgets/CalendarComponent/ui'
import { getTodayString } from '@/shared/utils/modelDate'
const date = defineModel<string>('date', {
  type: String,
  default: () => getTodayString(),
})
const clickHandler = (newDate: string) => {
  console.log('По заданию нужно было, чтобы календарь по клику отдавал дату', newDate)
}
</script>

<template>
  <CalendarComponent v-model="date" @on-date-select="clickHandler" />
</template>

<style scoped></style>
