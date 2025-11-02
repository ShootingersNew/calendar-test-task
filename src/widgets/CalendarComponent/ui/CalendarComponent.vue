<template>
  <div class="calendar">
    <DateNavigationComponent
      v-model="computedDateToDisplay"
      @switch-locale="switchLocale"
      :selected-locale="selectedLocale"
    />
    <DateSelectComponent
      v-model="computedSelectedDate"
      :selected-locale="selectedLocale"
      :date-to-display="computedDateToDisplay"
    />
  </div>
</template>
<script setup lang="ts">
import { DateSelectComponent } from '@/features/DateSelectComponent/ui'
import { DateNavigationComponent } from '@/features/DateNavigationComponent/ui'
import { computed, ref } from 'vue'
import { ELocales } from '@/shared/constants/locale'
import { toDate, formatModelValue, getTodayString } from '@/shared/utils/modelDate'

const props = defineProps({
  modelValue: {
    type: String,
    default: () => getTodayString(),
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
  (e: 'on-date-select', newValue: string): void
}>()
const selectedLocale = ref<ELocales>(ELocales.RU)
const switchLocale = () => {
  selectedLocale.value = selectedLocale.value === ELocales.RU ? ELocales.EN : ELocales.RU
}

const computedDateToDisplay = computed<Date>({
  get: () => toDate(props.modelValue as string),
  set: (newDate: Date) => {
    const res = formatModelValue(newDate)
    emit('update:modelValue', res)
  },
})

const computedSelectedDate = computed<Date>({
  get: () => toDate(props.modelValue as string),
  set: (newDate: Date) => {
    const res = formatModelValue(newDate)
    emit('on-date-select', res)
    emit('update:modelValue', res)
  },
})
</script>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid pink;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
</style>
