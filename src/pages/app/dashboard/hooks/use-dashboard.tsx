import { createContext, useContext } from 'react'

import { DashboardContextType } from './dashboard-provider'

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
)

function useDashboard() {
  const context = useContext(DashboardContext)

  if (!context || Object.keys(context).length === 0) {
    throw new Error('useDashboard must be used within an DashboardProvider')
  }
  return context
}

export { DashboardContext, useDashboard }
