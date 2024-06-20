import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import colors from 'tailwindcss/colors'

import { getStocks, Stock } from '@/api/get-stocks'

import { DashboardContext } from './use-dashboard'

export interface DashboardProviderProps {
  children: React.ReactNode
}

interface ChartColor {
  avatar: string
  line: string
}

export const chartColors: ChartColor[] = [
  { avatar: 'border-violet-500', line: colors.violet[500] },
  { avatar: 'border-sky-500', line: colors.sky[500] },
  { avatar: 'border-amber-500', line: colors.amber[500] },
  { avatar: 'border-emerald-500', line: colors.emerald[500] },
  { avatar: 'border-rose-500', line: colors.rose[500] },
]

interface StockSelectedState {
  stock: Stock
  color: ChartColor
}

export interface DashboardContextType {
  stocksSelected: string[]
  setStocksSelected: Dispatch<SetStateAction<string[]>>
  stockDetails: Stock[] | undefined
  setStockDetails: Dispatch<SetStateAction<Stock[] | undefined>>
  stocks: Stock[] | undefined
  isOpenStockHistory: boolean
  setIsOpenStockHistory: Dispatch<SetStateAction<boolean>>
  stockSelected: StockSelectedState | undefined
  setStockSelected: (data: { symbol: string; color: ChartColor }) => void
  chartColors: ChartColor[]
}

const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [stocksSelected, setStocksSelected] = useState<string[]>([])
  const [stockDetails, setStockDetails] = useState<Stock[] | undefined>([])
  const [isOpenStockHistory, setIsOpenStockHistory] = useState<boolean>(false)
  const [stockSelected, _setStockSelected] = useState<StockSelectedState>()

  const { data: stocks } = useQuery({
    queryKey: ['getStocks'],
    queryFn: getStocks,
  })

  useEffect(() => {
    if (stocks) {
      const selecteds = stocksSelected.map((v) =>
        stocks.find((stock) => stock.stock === v),
      )
      setStockDetails(selecteds as Stock[])
    }
  }, [stocks, stocksSelected])

  const setStockSelected = ({
    symbol,
    color,
  }: {
    symbol: string
    color: ChartColor
  }) => {
    const stockFiltered = stockDetails?.find((s) => s.stock === symbol)
    _setStockSelected({ stock: stockFiltered as Stock, color })
  }

  const contextValue: DashboardContextType = {
    stocksSelected,
    setStocksSelected,
    stockDetails,
    setStockDetails,
    stocks,
    isOpenStockHistory,
    setIsOpenStockHistory,
    stockSelected,
    setStockSelected,
    chartColors,
  }

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}

export { DashboardProvider }
