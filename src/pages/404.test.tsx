import { render } from '@testing-library/react'

import { NotFound } from './404'

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('404', () => {
  it('should render the 404 page', () => {
    const screen = render(<NotFound />)

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })
})
