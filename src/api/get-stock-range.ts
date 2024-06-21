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

  return response.data
}
