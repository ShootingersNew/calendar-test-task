<template>
  <div class="calendar">
    <DateNavigationComponent
      v-model="dateToDisplay"
      @switch-locale="switchLocale"
      :selected-locale="selectedLocale"
    />
    <DateSelectComponent
      v-model="selectedDate"
      :selected-locale="selectedLocale"
      :date-to-display="dateToDisplay"
    />
  </div>
</template>
<script setup lang="ts">
import { DateSelectComponent } from '@/features/DateSelectComponent/ui'
import { DateNavigationComponent } from '@/features/DateNavigationComponent/ui'
import { computed, ref } from 'vue'
import { ELocales } from '@/shared/constants/locale'

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
const selectedLocale = ref<ELocales>(ELocales.RU)
const dateToDisplay = ref<Date>(props.modelValue)
const switchLocale = () => {
  selectedLocale.value = selectedLocale.value === ELocales.RU ? ELocales.EN : ELocales.RU
}
const selectedDate = computed<Date>({
  get: () => props.modelValue,
  set: (newDate: Date) => {
    emit('on-date-select', newDate)
    emit('update:modelValue', newDate)
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
