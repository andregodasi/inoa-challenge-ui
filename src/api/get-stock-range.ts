import { api } from '@/lib/axios'

export interface HistoricalDataPrice {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjustedClose: number
}

export interface Result {
  currency: string
  shortName: string
  longName: string
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketTime: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayRange: string
  regularMarketDayLow: number
  regularMarketVolume: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  fiftyTwoWeekRange: string
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  symbol: string
  usedInterval: string
  usedRange: string
  historicalDataPrice: HistoricalDataPrice[]
  validRanges: string[]
  validIntervals: string[]
  priceEarnings: number
  earningsPerShare: number
  logourl: string
}

export interface StockRangeResponse {
  results: Result[]
  requestedAt: string
  took: string
}

export async function getStockRange(ticker: string) {
  const response = await api.get<StockRangeResponse>(`/brapi/quote/${ticker}`)

  if (response.data.results[0].historicalDataPrice.length < 61) {
    response.data.results[0].historicalDataPrice = new Array(61)
      .fill('')
      .map((_, index) => {
        return {
          date: index,
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
          adjustedClose: 0,
        }
      })
  }

  return response.data
}
