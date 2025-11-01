export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const findFirstDayIndex = (date: Date, weekStart = 0): number => {
  const native = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return (native - weekStart + 7) % 7
}
