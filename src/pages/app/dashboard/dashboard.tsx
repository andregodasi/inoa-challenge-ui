import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

import { Stock } from '@/api/get-stocks'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-selector'

import { StockChart } from './components/stock-chart'
import { StockHistoryDrawer } from './components/stock-history-drawer'
import { StockListDetails } from './components/stock-list-details'
import { useDashboard } from './hooks/use-dashboard'

export function Dashboard() {
  const { stocksSelected, setStocksSelected, stocks } = useDashboard()

  return (
    <>
      <main>
        <Helmet title="Dashboard" />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <div className="flex w-full flex-col items-center gap-3">
            <span className="text-2xl font-bold tracking-tight">
              Selecione um ativo ou mais para visualizar os dados
            </span>
            <MultiSelector
              values={stocksSelected}
              onValuesChange={(data) => {
                if (data.length > 5) {
                  toast.warning('Você pode selecionar no máximo 5 ativos')
                  return
                }
                setStocksSelected(data)
              }}
              loop
              className="w-full max-w-lg"
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {stocks?.map((stock: Stock) => (
                    <MultiSelectorItem key={stock.stock} value={stock.stock}>
                      {stock.stock} - {stock.name}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>

          <div className="grid grid-cols-9 grid-rows-2 gap-4">
            <StockChart />
            <StockListDetails />
          </div>
        </div>
      </main>
      <StockHistoryDrawer />
    </>
  )
}
