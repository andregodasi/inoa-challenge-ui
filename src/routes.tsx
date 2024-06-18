import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { QuoteComparisonDashboard } from './pages/quote-comparison-dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <QuoteComparisonDashboard /> }],
  },
])
