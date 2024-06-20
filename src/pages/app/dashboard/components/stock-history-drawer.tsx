import { useQuery } from '@tanstack/react-query'
import { AreaChart, Loader2 } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getStocksHistory } from '@/api/get-stocks-history'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { transformDataHistoryChart } from '@/pages/util/transformDataHistoryToChart'

import { useDashboard } from '../hooks/use-dashboard'

export function StockHistoryDrawer() {
  const {
    isOpenStockHistory,
    setIsOpenStockHistory,
    stockSelected,
    chartColors,
  } = useDashboard()

  const symbol = stockSelected?.stock.stock || ''
  const { data, isLoading } = useQuery({
    queryKey: ['getStocksHistory', symbol],
    queryFn: () => getStocksHistory(symbol),
    enabled: !!stockSelected?.stock.stock,
  })

  const monthlyTimeSeries =
    data?.['Monthly Time Series'] && transformDataHistoryChart(data)

  return (
    <Drawer open={isOpenStockHistory} onOpenChange={setIsOpenStockHistory}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Histórico do ativo</DrawerTitle>
          <DrawerDescription>
            <div>
              Periódo de{' '}
              {monthlyTimeSeries ? monthlyTimeSeries[0].date : 'xxxx'}
              {' até '}
              {monthlyTimeSeries
                ? monthlyTimeSeries[monthlyTimeSeries.length - 1].date
                : 'xxxx'}
            </div>
            <div className="flex items-center pt-4">
              <Avatar
                className={`h-9 w-9 border-2 ${stockSelected?.color.avatar}`}
              >
                <AvatarImage
                  src={stockSelected?.stock.logo}
                  alt={stockSelected?.stock.name}
                />
                <AvatarFallback>{stockSelected?.stock.stock}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {stockSelected?.stock.stock}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stockSelected?.stock.name} - {stockSelected?.stock.type}
                </p>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>

        {data && monthlyTimeSeries && (
          <div className="py-10 pr-10">
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={monthlyTimeSeries} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  dy={16}
                />

                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={80}
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
                    return Number(value).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }}
                />
                {Object.keys(monthlyTimeSeries[0])
                  .filter(
                    (key: string) => key !== '5. volume' && key !== 'date',
                  )
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
          </div>
        )}

        {isLoading && (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {!monthlyTimeSeries && !isLoading && (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-4">
            <p className="text-lg font-semibold">Selecione um ativo</p>
            <AreaChart size={100} />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
