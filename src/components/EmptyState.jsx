export default function EmptyState({ icono = '🧺', titulo, children }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span aria-hidden className="text-5xl">{icono}</span>
      <h2 className="text-lg font-bold text-fresh-900">{titulo}</h2>
      <div className="text-sm text-stone-600">{children}</div>
    </div>
  )
}
