import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="inoa-dashboard-theme">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Toaster />
          <Helmet titleTemplate="%s | Inoa Dashboard" />
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
