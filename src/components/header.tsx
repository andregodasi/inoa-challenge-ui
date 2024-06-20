import { Heart, LineChart } from 'lucide-react'

import { NavLink } from './nav-link'
import { useTheme } from './theme/theme-provider'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  const { theme } = useTheme()
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img
          src={
            theme === 'dark' || theme === 'system'
              ? 'https://www.inoa.com.br/images/logo.png'
              : 'https://www.inoa.com.br/images/logo-home.png'
          }
          alt="logo"
          className="h-6"
        />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <LineChart className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/about">
            <Heart className="h-4 w-4" />
            Sobre
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
