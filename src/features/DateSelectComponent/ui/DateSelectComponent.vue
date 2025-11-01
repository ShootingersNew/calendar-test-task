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
import { ELocales, isRuLocale } from '@/shared/constants/locale'
import { getDaysInMonth, findFirstDayIndex } from '@/features/DateSelectComponent/models/dateUtils'

const TILES_LENGTH = 42
const props = defineProps({
  modelValue: {
    type: Date,
    required: true,
  },
  dateToDisplay: {
    type: Date,
    required: true,
  },
  selectedLocale: {
    type: String,
    required: true,
  },
})
const emit = defineEmits<{ (e: 'update:modelValue', newDate: Date): void }>()
const computedDaysLength = computed((): number => getDaysInMonth(props.dateToDisplay))
const computedFirstDayIndex = computed((): number =>
  findFirstDayIndex(props.dateToDisplay, weekStart.value),
)
const computedSelectedDate = computed<Date>({
  get: () => props.modelValue,
  set: (newDate: Date) => {
    emit('update:modelValue', newDate)
  },
})
const weekStart = computed(() => (isRuLocale(props.selectedLocale) ? 1 : 0))

const dayTitles = computed((): string[] => {
  const locale = weekStart.value ? ELocales.RU : ELocales.EN
  const formatting = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const firstSunday = 4
  return Array.from({ length: 7 }, (_, i) => {
    const offset = (i + weekStart.value) % 7
    return formatting.format(new Date(1970, 0, firstSunday + offset))
  })
})

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
