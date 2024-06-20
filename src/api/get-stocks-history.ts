import { api } from '@/lib/axios'

interface MetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Time Zone': string
}

export interface Serie {
  [key: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string
  }
}

export interface StocksHistory {
  'Meta Data': MetaData
  'Monthly Time Series': Serie
}

export async function getStocksHistory(ticker: string) {
  const response = await api.get<StocksHistory>(
    `/alpha-vantage/time-series-daily/${ticker}`,
  )

  return response.data
}
