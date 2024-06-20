import { api } from '@/lib/axios'

export interface Index {
  stock: string
  name: string
}

export interface Stock {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  market_cap?: number
  logo: string
  sector?: string
  type: string
}

export interface StockListResponse {
  indexes: Index[]
  stocks: Stock[]
  availableSectors: string[]
  availableStockTypes: string[]
}

export async function getStocks() {
  const response = await api.get<StockListResponse>('/brapi/quote/list')

  return response.data.stocks
}
