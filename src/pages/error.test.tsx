import { render } from '@testing-library/react'

import { Error } from './error'

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  useRouteError: () => {
    return { error: { message: 'error message test' } }
  },
}))

describe('Error', () => {
  it('should render the Error page', () => {
    const screen = render(<Error />)

    expect(screen.getByText(/error message test/i)).toBeInTheDocument()
  })
})
