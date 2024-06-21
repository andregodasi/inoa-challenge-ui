import { Helmet } from 'react-helmet-async'

import { StockHistoryDrawer } from './components/stock-history-drawer'
import { StocksChart } from './components/stocks-chart'
import { StocksDetailsList } from './components/stocks-details-list'
import { StocksMultiSelect } from './components/stocks-multi-select'

export function Dashboard() {
  return (
    <>
      <main>
        <Helmet title="Dashboard" />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <StocksMultiSelect />
          <div className="grid grid-cols-9 grid-rows-2 gap-4">
            <StocksChart />
            <StocksDetailsList />
          </div>
        </div>
      </main>
      <StockHistoryDrawer />
    </>
  )
}
