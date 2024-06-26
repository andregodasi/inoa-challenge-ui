import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AppLayout } from './app'

vi.mock('@/components/header', () => ({
  Header: () => <header>Header</header>,
}))

const FakeComponent = () => <div>fake text</div>

describe('Layout app', () => {
  it('should render corretly AppLayout', () => {
    const wrapper = render(<FakeComponent />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={children} />
              </Route>
            </Routes>
          </MemoryRouter>
        )
      },
    })

    expect(wrapper.getByText(/Header/i)).toBeInTheDocument()
    expect(wrapper.getByText(/fake text/i)).toBeInTheDocument()
  })
})
