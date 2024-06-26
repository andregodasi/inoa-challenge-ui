import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'

import { About } from './about'

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('about', () => {
  it('should render the about page', () => {
    const screen = render(
      <HelmetProvider>
        <About />
      </HelmetProvider>,
    )

    expect(screen.getByText(/Sobre o projeto/i)).toBeInTheDocument()
    expect(screen.getByText(/Dashboard de Ativos B3/i)).toBeInTheDocument()
  })
})
