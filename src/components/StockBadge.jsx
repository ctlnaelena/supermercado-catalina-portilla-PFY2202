import { getEstado } from '../utils/format.js'

const estilos = {
  disponible: { clase: 'bg-fresh-100 text-fresh-700', texto: 'Disponible' },
  bajo: { clase: 'bg-amber-100 text-amber-800', texto: 'Pocas unidades' },
  agotado: { clase: 'bg-red-100 text-red-700', texto: 'Agotado' },
}

// Muestra el estado del producto según su stock (se actualiza solo al cambiar el inventario)
export default function StockBadge({ stock }) {
  const { clase, texto } = estilos[getEstado(stock)]
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${clase}`}>{texto}</span>
}
