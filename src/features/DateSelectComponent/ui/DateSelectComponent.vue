<template>
  <div class="day-titles">
    <div v-for="day in dayTitles" :key="day">{{ day }}</div>
  </div>
  <div class="days">
    <div
      v-for="index in TILES_LENGTH"
      :key="index"
      :class="{
        day: true,
        'day--selected': isDaySelected(index - 1),
      }"
    >
      <span v-if="!isTileEmpty(index - 1)" @click="onClickHandler(index - 1)">
        {{ index - computedFirstDayIndex }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    required: true,
  },
  dateToDisplay: {
    type: Date,
    required: true,
  },
})
const emit = defineEmits<{ (e: 'update:modelValue', newDate: Date): void }>()
const computedDaysLength = computed((): number => getDaysInMonth(props.dateToDisplay))
const computedFirstDayIndex = computed((): number => findFirstDayIndex(props.dateToDisplay))
const computedSelectedDate = computed<Date>({
  get: () => props.modelValue,
  set: (newDate: Date) => {
    console.log('emitting new date:', newDate)
    emit('update:modelValue', newDate)
  },
})
const dayTitles = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const TILES_LENGTH = 42

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
const findFirstDayIndex = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}
const isTileEmpty = (index: number): boolean => {
  return (
    index < computedFirstDayIndex.value ||
    index >= computedFirstDayIndex.value + computedDaysLength.value
  )
}
const isDaySelected = (index: number): boolean => {
  if (isTileEmpty(index)) {
    return false
  }
  const dayDate = new Date(
    props.dateToDisplay.getFullYear(),
    props.dateToDisplay.getMonth(),
    index - computedFirstDayIndex.value + 1,
  )
  return dayDate.toDateString() === computedSelectedDate.value.toDateString()
}
const onClickHandler = (tileIndex: number) => {
  const dayNumber = tileIndex - computedFirstDayIndex.value + 1
  const newDate = new Date(
    props.dateToDisplay.getFullYear(),
    props.dateToDisplay.getMonth(),
    dayNumber,
  )
  computedSelectedDate.value = newDate
}
</script>

<style scoped>
.day-titles {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 4px;
}
.day--selected {
  background-color: #007bff;
  color: white;
}
</style>
