import { CATEGORIAS } from '../data/initialProducts.js'

// Filtro por categoría (chips). Solo notifica la selección: no toca el inventario.
export default function CategoryFilter({ value, onChange, conteos }) {
  const opciones = ['Todas', ...CATEGORIAS]
  return (
    <div role="radiogroup" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
      {opciones.map((cat) => {
        const activa = value === cat
        return (
          <button
            key={cat}
            type="button"
            role="radio"
            aria-checked={activa}
            onClick={() => onChange(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
              activa
                ? 'border-fresh-600 bg-fresh-600 text-white'
                : 'border-stone-300 bg-white text-stone-700 hover:border-fresh-500 hover:text-fresh-700'
            }`}
          >
            {cat} <span className={activa ? 'text-fresh-100' : 'text-stone-400'}>({conteos[cat] ?? 0})</span>
          </button>
        )
      })}
    </div>
  )
}
