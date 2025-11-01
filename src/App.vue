<script setup lang="ts">
import { CalendarComponent } from './widgets/CalendarComponent/ui'
const date = defineModel<Date>('date', {
  type: Date,
  default: () => new Date(),
})
const clickHandler = (newDate: Date) => {
  console.log('По заданию нужно было, чтобы календарь по клику отдавал дату', newDate)
}
</script>

<template>
  <CalendarComponent v-model="date" @on-date-select="clickHandler" />
</template>

<style scoped></style>
