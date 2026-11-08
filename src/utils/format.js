const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export const formatCLP = (valor) => clp.format(valor)

// Umbral bajo el cual se avisa "pocas unidades"
export const STOCK_BAJO = 5

// Estado del producto según el stock disponible
export function getEstado(stock) {
  if (stock <= 0) return 'agotado'
  if (stock <= STOCK_BAJO) return 'bajo'
  return 'disponible'
}
