import { Serie } from '@/api/get-stocks-history'

interface DataHistoryChart {
  date: string
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

export function transformDataHistoryChart(input: {
  'Monthly Time Series': Serie
}): DataHistoryChart[] {
  const timeSeries = input['Monthly Time Series']
  const result: DataHistoryChart[] = []

  for (const date in timeSeries) {
    // eslint-disable-next-line no-prototype-builtins
    if (timeSeries.hasOwnProperty(date)) {
      const entry = timeSeries[date]
      result.push({
        date,
        ...entry,
      })
    }
  }

  return result.reverse()
}
