import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import InventoryTable from '../components/InventoryTable.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useInventory } from '../context/InventoryContext.jsx'

export default function Inventory() {
  const { products } = useInventory()
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  // El filtro se calcula a partir de `products` SIN modificarlo: los datos originales quedan intactos
  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return products.filter(
      (p) =>
        (categoria === 'Todas' || p.tipo === categoria) &&
        (!texto || `${p.nombre} ${p.marca}`.toLowerCase().includes(texto)),
    )
  }, [products, categoria, busqueda])

  const conteos = useMemo(() => {
    const c = { Todas: products.length }
    products.forEach((p) => {
      c[p.tipo] = (c[p.tipo] ?? 0) + 1
    })
    return c
  }, [products])

  return (
    <>
      <PageHeader titulo="Inventario" subtitulo="Todos los artículos disponibles en el supermercado.">
        <Link to="/agregar" className="btn-primary">+ Agregar artículo</Link>
      </PageHeader>

      <section aria-label="Filtros" className="mb-5 grid gap-4">
        <label className="block max-w-md">
          <span className="mb-1 block text-sm font-semibold text-stone-700">Buscar por nombre o marca</span>
          <input
            type="search"
            className="input"
            placeholder="Ej: Colun, arroz…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
        <CategoryFilter value={categoria} onChange={setCategoria} conteos={conteos} />
      </section>

      <p className="mb-3 text-sm text-stone-600" aria-live="polite">
        Mostrando <strong>{filtrados.length}</strong> de <strong>{products.length}</strong> artículos
        {categoria !== 'Todas' && <> en <strong>{categoria}</strong></>}
        {(categoria !== 'Todas' || busqueda) && (
          <button
            type="button"
            className="ml-2 font-semibold text-fresh-700 underline"
            onClick={() => {
              setCategoria('Todas')
              setBusqueda('')
            }}
          >
            Limpiar filtros
          </button>
        )}
      </p>

      {filtrados.length ? (
        <InventoryTable productos={filtrados} />
      ) : (
        <EmptyState icono="🔎" titulo="Sin resultados">
          No hay artículos que coincidan con el filtro seleccionado.
        </EmptyState>
      )}
    </>
  )
}
