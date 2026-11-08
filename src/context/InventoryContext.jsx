import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { initialState, inventoryReducer } from './inventoryReducer.js'

const STORAGE_KEY = 'supermercado-inventario-v1'
const InventoryContext = createContext(null)

// Lee el estado guardado (si existe y es válido)
function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      if (Array.isArray(saved?.products) && Array.isArray(saved?.cart)) return saved
    }
  } catch {
    /* sin localStorage: se usa el estado inicial */
  }
  return initialState
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, undefined, init)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignorar */
    }
  }, [state])

  const value = useMemo(() => {
    const cartItems = state.cart
      .map((item) => {
        const producto = state.products.find((p) => p.id === item.id)
        return producto ? { ...producto, cantidad: item.cantidad } : null
      })
      .filter(Boolean)
    return {
      products: state.products,
      cartItems,
      cartCount: cartItems.reduce((acc, i) => acc + i.cantidad, 0),
      cartTotal: cartItems.reduce((acc, i) => acc + i.cantidad * i.precio, 0),
      addProduct: (payload) => dispatch({ type: 'ADD_PRODUCT', payload }),
      addToCart: (id, cantidad = 1) => dispatch({ type: 'ADD_TO_CART', payload: { id, cantidad } }),
      increment: (id) => dispatch({ type: 'INCREMENT', id }),
      decrement: (id) => dispatch({ type: 'DECREMENT', id }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      checkout: () => dispatch({ type: 'CHECKOUT' }),
      resetAll: () => dispatch({ type: 'RESET' }),
    }
  }, [state])

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

// Hook para consumir el estado global
export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory debe usarse dentro de <InventoryProvider>')
  return ctx
}
