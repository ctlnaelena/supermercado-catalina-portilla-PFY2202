import { Link } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext.jsx'
import { getEstado } from '../utils/format.js'

export default function Home() {
  const { products, cartCount, resetAll } = useInventory()
  const unidades = products.reduce((a, p) => a + p.stock, 0)
  const bajos = products.filter((p) => getEstado(p.stock) === 'bajo').length
  const agotados = products.filter((p) => getEstado(p.stock) === 'agotado').length

  const stats = [
    { label: 'Artículos', valor: products.length },
    { label: 'Unidades en stock', valor: unidades },
    { label: 'Stock bajo', valor: bajos },
    { label: 'Agotados', valor: agotados },
  ]

  return (
    <>
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-fresh-600 to-fresh-900 px-6 py-12 text-white sm:px-12 sm:py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-citrus-400">Gestión de inventario</p>
        <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">Todo tu supermercado, siempre al día.</h1>
        <p className="mt-4 max-w-lg text-fresh-100">
          Revisa el stock, filtra por categoría, agrega productos al carrito y mira cómo el inventario se actualiza al instante.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/inventario" className="btn bg-citrus-400 text-fresh-900 hover:bg-citrus-500">Ver inventario</Link>
          <Link to="/agregar" className="btn border border-white/40 text-white hover:bg-white/10">Agregar artículo</Link>
          <Link to="/carrito" className="btn border border-white/40 text-white hover:bg-white/10">Carrito ({cartCount})</Link>
        </div>
      </section>

      <section aria-label="Resumen del inventario" className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-3xl font-extrabold tabular-nums text-fresh-700">{s.valor}</p>
            <p className="text-sm text-stone-600">{s.label}</p>
          </div>
        ))}
      </section>

      <p className="mt-6 text-sm text-stone-500">
        ¿Quieres volver a los datos de ejemplo?{' '}
        <button
          type="button"
          className="font-semibold text-fresh-700 underline"
          onClick={() => window.confirm('Se restablecerán el inventario y el carrito. ¿Continuar?') && resetAll()}
        >
          Restablecer inventario
        </button>
      </p>
    </>
  )
}
