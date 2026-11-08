// Control +/- reutilizado en detalle y carrito
export default function QuantityControl({ value, onDecrement, onIncrement, disableDecrement, disableIncrement, label }) {
  const boton =
    'grid size-9 place-items-center rounded-lg border border-stone-300 bg-white text-lg font-bold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40'
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={`Cantidad de ${label}`}>
      <button type="button" className={boton} onClick={onDecrement} disabled={disableDecrement} aria-label={`Disminuir ${label}`}>
        −
      </button>
      <output className="w-8 text-center font-bold tabular-nums" aria-live="polite">{value}</output>
      <button type="button" className={boton} onClick={onIncrement} disabled={disableIncrement} aria-label={`Aumentar ${label}`}>
        +
      </button>
    </div>
  )
}
