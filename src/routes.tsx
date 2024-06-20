import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { About } from './pages/app/about/about'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { DashboardProvider } from './pages/app/dashboard/hooks/dashboard-provider'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        ),
      },
      { path: '/about', element: <About /> },
    ],
  },
])
