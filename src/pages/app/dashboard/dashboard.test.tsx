import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'

import { Dashboard } from './dashboard'

vi.mock('./components/stock-history-drawer', () => ({
  StockHistoryDrawer: () => <div>StockHistoryDrawer</div>,
}))

vi.mock('./components/stocks-chart', () => ({
  StocksChart: () => <div>StocksChart</div>,
}))

vi.mock('./components/stocks-details-list', () => ({
  StocksDetailsList: () => <div>StocksDetailsList</div>,
}))

vi.mock('./components/stocks-multi-select', () => ({
  StocksMultiSelect: () => <div>StocksMultiSelect</div>,
}))

describe('Dashboard', () => {
  it('should render the Dashboard page', () => {
    const screen = render(
      <HelmetProvider>
        <Dashboard />
      </HelmetProvider>,
    )

    expect(screen.getByText('StockHistoryDrawer')).toBeInTheDocument()
    expect(screen.getByText('StocksChart')).toBeInTheDocument()
    expect(screen.getByText('StocksDetailsList')).toBeInTheDocument()
    expect(screen.getByText('StocksMultiSelect')).toBeInTheDocument()
  })
})
