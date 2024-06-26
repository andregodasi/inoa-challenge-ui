import { renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

import { DashboardContextType } from './dashboard-provider'
import { DashboardContext, useDashboard } from './use-dashboard'

describe('useDashboard', () => {
  it('should throw an error when used outside of DashboardProvider', () => {
    expect(() => {
      renderHook(() => useDashboard())
    }).toThrow('useDashboard must be used within an DashboardProvider')
  })

  it('should return the context value when used within DashboardProvider', async () => {
    const contextValue: DashboardContextType = {
      stocksSelected: [],
      setStocksSelected: vi.fn(),
      stockDetails: undefined,
      setStockDetails: vi.fn(),
      stocks: [],
      isLoadingStocks: false,
      isOpenStockHistory: false,
      setIsOpenStockHistory: vi.fn(),
      stockSelected: undefined,
      setStockSelected: vi.fn(),
      chartColors: [],
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DashboardContext.Provider value={contextValue}>
        {children}
      </DashboardContext.Provider>
    )

    const { result } = renderHook(() => useDashboard(), { wrapper })

    await waitFor(() => {
      expect(result.current).toEqual(contextValue)
    })
  })
})
