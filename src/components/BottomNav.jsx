import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Inicio', icon: '🏠', end: true },
  { to: '/quienes-somos', label: 'Quiénes somos', icon: '🏪' },
  { to: '/contacto', label: 'Contáctanos', icon: '✉️' },
]

// Menú inferior: navegación general
export default function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 backdrop-blur"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-3">
        {items.map(({ to, label, icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-xs font-semibold transition sm:flex-row sm:justify-center sm:gap-2 sm:py-3 sm:text-sm ${
                  isActive ? 'text-fresh-700' : 'text-stone-500 hover:text-fresh-600'
                }`
              }
            >
              <span aria-hidden className="text-xl">{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
