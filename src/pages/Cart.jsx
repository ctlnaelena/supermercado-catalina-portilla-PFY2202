import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ProductThumb from '../components/ProductThumb.jsx'
import QuantityControl from '../components/QuantityControl.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useInventory } from '../context/InventoryContext.jsx'
import { formatCLP } from '../utils/format.js'

export default function Cart() {
  const { cartItems, cartCount, cartTotal, increment, decrement, removeFromCart, clearCart, checkout } = useInventory()
  const [compraOk, setCompraOk] = useState(null)

  const finalizar = () => {
    setCompraOk({ total: cartTotal, unidades: cartCount })
    checkout()
  }

  if (!cartItems.length) {
    return (
      <>
        <PageHeader titulo="Carrito de compras" />
        {compraOk && (
          <p role="status" className="mb-4 rounded-xl bg-fresh-50 px-4 py-3 text-sm text-fresh-900">
            🎉 ¡Compra realizada! {compraOk.unidades} artículo(s) por <strong>{formatCLP(compraOk.total)}</strong>.
          </p>
        )}
        <EmptyState icono="🛒" titulo="Tu carrito está vacío">
          Agrega artículos desde el inventario para verlos aquí.
          <div className="mt-4"><Link to="/inventario" className="btn-primary">Ir al inventario</Link></div>
        </EmptyState>
      </>
    )
  }

  return (
    <>
      <PageHeader titulo="Carrito de compras" subtitulo={`${cartCount} artículo(s) en tu carrito.`}>
        <button type="button" className="btn-danger" onClick={clearCart}>Vaciar carrito</button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <ul className="grid gap-3">
          {cartItems.map((item) => (
            <li key={item.id} className="card flex flex-wrap items-center gap-4 p-4">
              <ProductThumb tipo={item.tipo} />
              <div className="min-w-40 flex-1">
                <Link to={`/inventario/${item.id}`} className="font-semibold hover:text-fresh-700">{item.nombre}</Link>
                <p className="text-xs text-stone-500">{item.marca} · {formatCLP(item.precio)} c/u</p>
                <p className="text-xs text-stone-500">Quedan {item.stock} en inventario</p>
              </div>
              <QuantityControl
                label={item.nombre}
                value={item.cantidad}
                onDecrement={() => decrement(item.id)}
                onIncrement={() => increment(item.id)}
                disableIncrement={item.stock <= 0}
              />
              <div className="w-24 text-right font-bold tabular-nums">{formatCLP(item.precio * item.cantidad)}</div>
              <button
                type="button"
                className="text-sm font-semibold text-red-600 hover:underline"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Quitar ${item.nombre} del carrito`}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>

        <aside className="card h-fit p-5 lg:sticky lg:top-24">
          <h2 className="mb-3 text-lg font-bold text-fresh-900">Resumen</h2>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between"><dt className="text-stone-600">Artículos</dt><dd className="font-semibold tabular-nums">{cartCount}</dd></div>
            <div className="flex justify-between border-t border-stone-100 pt-2 text-base">
              <dt className="font-bold">Total</dt><dd className="font-extrabold tabular-nums text-fresh-700">{formatCLP(cartTotal)}</dd>
            </div>
          </dl>
          <button type="button" className="btn-primary mt-4 w-full" onClick={finalizar}>Finalizar compra</button>
          <Link to="/inventario" className="btn-secondary mt-2 w-full">Seguir comprando</Link>
        </aside>
      </div>
    </>
  )
}
