import { initialProducts } from '../data/initialProducts.js'

export const initialState = {
  products: initialProducts, // inventario (la fuente de verdad; nunca se filtra aquí)
  cart: [],                  // [{ id, cantidad }]
}

/**
 * Regla central del sistema:
 *  - agregar al carrito  => resta stock del inventario
 *  - quitar / disminuir  => devuelve stock al inventario
 *  - finalizar compra    => vacía el carrito (el stock queda descontado)
 */
export function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const nextId = state.products.reduce((max, p) => Math.max(max, p.id), 0) + 1
      return { ...state, products: [...state.products, { ...action.payload, id: nextId }] }
    }

    case 'ADD_TO_CART': {
      const { id, cantidad } = action.payload
      const producto = state.products.find((p) => p.id === id)
      if (!producto || cantidad <= 0) return state
      const qty = Math.min(cantidad, producto.stock) // nunca más de lo disponible
      if (qty === 0) return state
      const products = state.products.map((p) => (p.id === id ? { ...p, stock: p.stock - qty } : p))
      const existe = state.cart.some((i) => i.id === id)
      const cart = existe
        ? state.cart.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + qty } : i))
        : [...state.cart, { id, cantidad: qty }]
      return { products, cart }
    }

    case 'INCREMENT': {
      const producto = state.products.find((p) => p.id === action.id)
      if (!producto || producto.stock <= 0) return state
      return {
        products: state.products.map((p) => (p.id === action.id ? { ...p, stock: p.stock - 1 } : p)),
        cart: state.cart.map((i) => (i.id === action.id ? { ...i, cantidad: i.cantidad + 1 } : i)),
      }
    }

    case 'DECREMENT': {
      const item = state.cart.find((i) => i.id === action.id)
      if (!item) return state
      const products = state.products.map((p) => (p.id === action.id ? { ...p, stock: p.stock + 1 } : p))
      const cart =
        item.cantidad <= 1
          ? state.cart.filter((i) => i.id !== action.id)
          : state.cart.map((i) => (i.id === action.id ? { ...i, cantidad: i.cantidad - 1 } : i))
      return { products, cart }
    }

    case 'REMOVE_FROM_CART': {
      const item = state.cart.find((i) => i.id === action.id)
      if (!item) return state
      return {
        products: state.products.map((p) => (p.id === action.id ? { ...p, stock: p.stock + item.cantidad } : p)),
        cart: state.cart.filter((i) => i.id !== action.id),
      }
    }

    case 'CLEAR_CART': {
      const devoluciones = Object.fromEntries(state.cart.map((i) => [i.id, i.cantidad]))
      return {
        products: state.products.map((p) => ({ ...p, stock: p.stock + (devoluciones[p.id] ?? 0) })),
        cart: [],
      }
    }

    case 'CHECKOUT':
      return { ...state, cart: [] }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
