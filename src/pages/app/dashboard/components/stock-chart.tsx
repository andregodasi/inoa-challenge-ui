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

import { getStockRange } from '@/api/get-stock-range'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { transformDataChart } from '@/pages/util/transformDataChart'

import { chartColors } from '../hooks/dashboard-provider'
import { useDashboard } from '../hooks/use-dashboard'

export function StockChart() {
  const { stocksSelected } = useDashboard()
  const [period, setPeriod] = useState<number>(0)

  const { data: dataResults, isLoading: isLoadingResults } = useQueries({
    queries: stocksSelected.map((stock) => ({
      queryKey: ['getStockRange', stock],
      queryFn: () => getStockRange(stock),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: transformDataChart(results),
        isLoading: results.some((result) => result.isLoading),
      }
    },
  })

  return (
    <Card className="col-span-9 md:col-span-6">
      <CardHeader className="flex-col items-center justify-between pb-8 md:flex-row">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Ativos</CardTitle>
          <CardDescription>
            Veja as comparações dos ativos dos últimos 3 meses
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <Select
            disabled={!dataResults.length}
            onValueChange={(data: string) => setPeriod(Number(data))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um período" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="51">10 dias</SelectItem>
                <SelectItem value="41">20 dias</SelectItem>
                <SelectItem value="31">30 dias</SelectItem>
                <SelectItem value="0">61 dias</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {!!dataResults.length && !isLoadingResults && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={dataResults.slice(period, 61)}
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
            <p className="text-lg font-semibold">Selecione um ativo</p>
            <AreaChart size={100} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
