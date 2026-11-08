import { Link } from 'react-router-dom'
import ProductThumb from './ProductThumb.jsx'
import StockBadge from './StockBadge.jsx'
import { formatCLP } from '../utils/format.js'

// Tabla (escritorio) + tarjetas (móvil) con la información completa de cada artículo
export default function InventoryTable({ productos }) {
  return (
    <>
      {/* Escritorio */}
      <div className="card hidden overflow-hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-fresh-50 text-xs uppercase tracking-wide text-fresh-700">
            <tr>
              <th scope="col" className="px-4 py-3">Artículo</th>
              <th scope="col" className="px-4 py-3">Marca</th>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3 text-right">Precio</th>
              <th scope="col" className="px-4 py-3 text-right">Stock</th>
              <th scope="col" className="px-4 py-3">Estado</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {productos.map((p) => (
              <tr key={p.id} className="transition hover:bg-fresh-50/60">
                <td className="px-4 py-3">
                  <Link to={`/inventario/${p.id}`} className="flex items-center gap-3 font-semibold text-stone-900 hover:text-fresh-700">
                    <ProductThumb tipo={p.tipo} />
                    {p.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-600">{p.marca}</td>
                <td className="px-4 py-3 text-stone-600">{p.tipo}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatCLP(p.precio)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{p.stock}</td>
                <td className="px-4 py-3"><StockBadge stock={p.stock} /></td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/inventario/${p.id}`} className="btn-secondary !px-3 !py-1.5">Ver detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <ul className="grid gap-3 md:hidden">
        {productos.map((p) => (
          <li key={p.id}>
            <Link to={`/inventario/${p.id}`} className="card flex items-center gap-3 p-3 transition hover:border-fresh-500">
              <ProductThumb tipo={p.tipo} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-stone-900">{p.nombre}</p>
                <p className="truncate text-xs text-stone-500">{p.marca} · {p.tipo}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold">{formatCLP(p.precio)}</span>
                  <StockBadge stock={p.stock} />
                </div>
              </div>
              <div className="text-right text-xs text-stone-500">
                <span className="block text-lg font-bold tabular-nums text-stone-800">{p.stock}</span>
                en stock
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
