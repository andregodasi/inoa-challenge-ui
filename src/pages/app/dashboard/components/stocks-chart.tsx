import { useQueries } from '@tanstack/react-query'
import { AreaChart, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { toast } from 'sonner'

import { getStockRange } from '@/api/get-stock-range'
import { Card, CardContent } from '@/components/ui/card'
import { transformDataChart } from '@/pages/util/transformDataChart'

import { chartColors } from '../hooks/dashboard-provider'
import { useDashboard } from '../hooks/use-dashboard'
import { StocksHeaderChart } from './stocks-header-chart'

export function StocksChart() {
  const { stocksSelected, setStocksSelected } = useDashboard()
  const [period, setPeriod] = useState<number>(0)

  const { data: dataResults, isLoading: isLoadingResults } = useQueries({
    queries: stocksSelected.map((stock) => ({
      queryKey: ['getStockRange', stock],
      queryFn: () => getStockRange(stock),
      staleTime: Infinity,
    })),
    combine: (results) => {
      if (!results.length || results.some((result) => !result?.data)) {
        return {
          data: [],
          isLoading: results.some((result) => result.isLoading),
        }
      }

      const checkHistoricalDataPrice =
        !!results[results.length - 1]?.data?.results[0].historicalDataPrice
          .length
      if (!checkHistoricalDataPrice) {
        toast.error('Esse ativo não possui histórico de preços')
        setStocksSelected(stocksSelected.slice(0, -1))
        return {
          data: transformDataChart(results.slice(0, -1)),
          isLoading: results.some((result) => result.isLoading),
        }
      }
      return {
        data: transformDataChart(results),
        isLoading: results.some((result) => result.isLoading),
      }
    },
  })

  return (
    <Card className="col-span-9 md:col-span-6">
      <StocksHeaderChart setPeriod={setPeriod} dataResults={dataResults} />
      <CardContent>
        {!!dataResults.length && !isLoadingResults && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={dataResults.slice(
                period ? dataResults.length - period : 0,
                dataResults.length,
              )}
              style={{ fontSize: 12 }}
            >
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={40}
                tickFormatter={(value: number) => {
                  return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Tooltip
                labelClassName="text-zinc-700 font-semibold"
                formatter={(value: number | string) => {
                  if (typeof value === 'string') return value
                  return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }}
              />
              {Object.keys(dataResults[0])
                .filter((key: string) => key !== 'date')
                .map((key: string, i: number) => {
                  return (
                    <Line
                      key={key}
                      stroke={chartColors[i].line}
                      type="linear"
                      strokeWidth={2}
                      dataKey={key}
                      dot={false}
                    />
                  )
                })}
            </LineChart>
          </ResponsiveContainer>
        )}
        {isLoadingResults && (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {!dataResults.length && !isLoadingResults && (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-4">
            <AreaChart size={100} />
            <p className="text-lg font-semibold">Selecione um ativo</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
