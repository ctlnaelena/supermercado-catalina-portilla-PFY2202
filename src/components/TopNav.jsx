import { Link, NavLink } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext.jsx'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-white text-fresh-700' : 'text-fresh-50 hover:bg-fresh-700'
  }`

// Menú superior: gestión del inventario
export default function TopNav() {
  const { cartCount } = useInventory()
  return (
    <header className="sticky top-0 z-30 bg-fresh-600 shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
          <span aria-hidden className="text-2xl">🛒</span> Goodies
        </Link>
        <nav aria-label="Gestión de inventario" className="flex items-center gap-1">
          <NavLink to="/inventario" className={linkClass}>Inventario</NavLink>
          <NavLink to="/agregar" className={linkClass}>Agregar</NavLink>
          <NavLink to="/carrito" className={linkClass}>
            <span className="flex items-center gap-1.5">
              Carrito
              <span
                aria-label={`${cartCount} artículos en el carrito`}
                className="min-w-5 rounded-full bg-citrus-400 px-1.5 text-center text-xs font-bold text-fresh-900"
              >
                {cartCount}
              </span>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
