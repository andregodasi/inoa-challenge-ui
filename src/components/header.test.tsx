import { render } from '@testing-library/react'

import { Header } from './header'

vi.mock('react-router-dom', () => ({
  useLocation: () => {
    return {
      pathName: '/',
    }
  },
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('Header', () => {
  it('should correctly show the header', () => {
    const wrapper = render(<Header />)

    expect(wrapper.getByText('Dashboard')).toBeInTheDocument()
    expect(wrapper.getByText('Sobre')).toBeInTheDocument()
    expect(wrapper.getByText('Toggle theme')).toBeInTheDocument()
  })
})
