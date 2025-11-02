export const toDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.split('-').map(val => parseInt(val, 10))
  return new Date(year || 1970, (month || 1) - 1, day || 1)
}

export const formatModelValue = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const getTodayString = (): string => formatModelValue(new Date())
