export default function formatDate(inputDate: string): string {
  const parts = inputDate.split('-')

  if (parts.length !== 3) {
    console.error('Unexpected date format')
    return ''
  }

  const [year, month, day] = parts

  if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    console.error('Unexpected date format')
    return ''
  }

  return `${day}.${month}.${year}`
}
