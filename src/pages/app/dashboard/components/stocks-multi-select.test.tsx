import { render } from '@testing-library/react'
import { Mock } from 'vitest'

import { useDashboard } from '../hooks/use-dashboard'
import { useDashboardkMocked } from './__mocks__/stock-multi-select.mock'
import { StocksMultiSelect } from './stocks-multi-select'

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

vi.mock('../hooks/use-dashboard')

const useDashboardMock = useDashboard as Mock

describe('StocksMultiSelect', () => {
  it('should render corretly the StocksMultiSelect component', async () => {
    const setStocksSelectedMock = vi.fn()
    useDashboardMock.mockImplementation(() =>
      useDashboardkMocked(setStocksSelectedMock),
    )
    const screen = render(<StocksMultiSelect />)

    expect(screen.getByLabelText('Remove PETR4 option')).toBeInTheDocument()
  })
})
