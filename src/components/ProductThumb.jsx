import { ICONOS_CATEGORIA } from '../data/initialProducts.js'

const tamanos = { sm: 'size-12 text-2xl', lg: 'size-40 text-7xl sm:size-56 sm:text-8xl' }

export default function ProductThumb({ tipo, size = 'sm' }) {
  return (
    <div
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-2xl bg-fresh-50 ring-1 ring-fresh-100 ${tamanos[size]}`}
    >
      {ICONOS_CATEGORIA[tipo] ?? '📦'}
    </div>
  )
}
