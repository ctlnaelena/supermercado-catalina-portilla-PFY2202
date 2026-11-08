import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopNav from './TopNav.jsx'
import BottomNav from './BottomNav.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  // Al cambiar de pantalla volvemos arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
