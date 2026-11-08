import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ProductThumb from '../components/ProductThumb.jsx'
import StockBadge from '../components/StockBadge.jsx'
import QuantityControl from '../components/QuantityControl.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useInventory } from '../context/InventoryContext.jsx'
import { formatCLP } from '../utils/format.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, cartItems, addToCart } = useInventory()
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState('')

  const producto = products.find((p) => p.id === Number(id))
  if (!producto) {
    return (
      <EmptyState icono="🤷" titulo="Artículo no encontrado">
        <Link to="/inventario" className="btn-primary mt-2">Volver al inventario</Link>
      </EmptyState>
    )
  }

  const enCarrito = cartItems.find((i) => i.id === producto.id)?.cantidad ?? 0
  // si el stock baja (p. ej. desde otra pantalla), la cantidad elegida se ajusta
  const maxElegible = Math.max(producto.stock, 0)
  const cantidadValida = Math.min(cantidad, Math.max(maxElegible, 1))

  const handleAdd = () => {
    addToCart(producto.id, cantidadValida)
    setAviso(`Agregaste ${cantidadValida} × ${producto.nombre} al carrito.`)
    setCantidad(1)
  }

  return (
    <>
      <button type="button" onClick={() => navigate(-1)} className="mb-4 text-sm font-semibold text-fresh-700 hover:underline">
        ← Volver
      </button>
      <PageHeader titulo={producto.nombre} subtitulo={`${producto.marca} · ${producto.tipo}`} />

      <div className="card grid gap-6 p-5 sm:p-8 md:grid-cols-[auto_1fr]">
        <div className="mx-auto md:mx-0"><ProductThumb tipo={producto.tipo} size="lg" /></div>

        <div className="flex flex-col gap-5">
          <p className="text-stone-700">{producto.descripcion}</p>

          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div><dt className="text-stone-500">Precio</dt><dd className="text-xl font-extrabold text-fresh-700">{formatCLP(producto.precio)}</dd></div>
            <div><dt className="text-stone-500">Disponibles</dt><dd className="text-xl font-extrabold tabular-nums">{producto.stock}</dd></div>
            <div><dt className="text-stone-500">Estado</dt><dd className="mt-1"><StockBadge stock={producto.stock} /></dd></div>
            <div><dt className="text-stone-500">En tu carrito</dt><dd className="text-xl font-extrabold tabular-nums">{enCarrito}</dd></div>
          </dl>

          <div className="flex flex-wrap items-center gap-4 border-t border-stone-100 pt-5">
            <QuantityControl
              label={producto.nombre}
              value={producto.stock > 0 ? cantidadValida : 0}
              onDecrement={() => setCantidad(Math.max(1, cantidadValida - 1))}
              onIncrement={() => setCantidad(Math.min(maxElegible, cantidadValida + 1))}
              disableDecrement={producto.stock === 0 || cantidadValida <= 1}
              disableIncrement={producto.stock === 0 || cantidadValida >= maxElegible}
            />
            <button type="button" className="btn-primary" onClick={handleAdd} disabled={producto.stock === 0}>
              {producto.stock === 0 ? 'Sin stock' : '🛒 Agregar al carrito'}
            </button>
          </div>

          {aviso && (
            <p role="status" className="flex flex-wrap items-center gap-3 rounded-xl bg-fresh-50 px-4 py-3 text-sm text-fresh-900">
              ✅ {aviso}
              <Link to="/carrito" className="font-bold underline">Ir al carrito</Link>
            </p>
          )}
        </div>
      </div>
    </>
  )
}
