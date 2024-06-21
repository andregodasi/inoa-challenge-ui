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
  isLoadingStocks: boolean
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

  const {
    data: stocks,
    isLoading: isLoadingStocks,
    isError,
    isLoadingError,
    error,
  } = useQuery({
    queryKey: ['getStocks'],
    queryFn: getStocks,
    retry: 5,
  })

  if (error || isError || isLoadingError) {
    console.error('Error fetching stocks')
    console.error(isError)
    console.error(isLoadingError)
  }

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
    isLoadingStocks,
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
