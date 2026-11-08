# 🛒 Súper Fresco · Gestión de inventario de supermercado

Proyecto de **Desarrollo Frontend II**

## Tecnologías

- [React 19](https://react.dev/) (hooks, Context API + `useReducer`)
- [React Router](https://reactrouter.com/) (`HashRouter`, compatible con GitHub Pages)
- [Tailwind CSS 4](https://tailwindcss.com/) (diseño responsive y estilos consistentes)
- [Vite](https://vite.dev/) como herramienta de construcción

## Funcionalidades

| Semana | Funcionalidad |
|-------|---------------|
| 1 | Página de inicio, menú inferior y páginas *Quiénes somos* y *Contáctanos* con React Router |
| 2 | Estado global del inventario, formulario para **agregar artículos** (con validación) y **tabla** con todo el inventario |
| 3 | **Filtro por categoría**, **detalle de artículo**, **carrito de compras** y actualización del inventario |

### Detalle de la Semana 3

- **Filtro por categoría:** se calcula con `useMemo` a partir del inventario, *sin modificar* el estado original; "Todas" restaura el listado completo. Incluye además búsqueda por nombre/marca.
- **Detalle (`/inventario/:id`):** muestra precio, stock, estado y permite elegir cantidad y **agregar al carrito**, lo que **resta** la cantidad del inventario.
- **Carrito (`/carrito`):** lista los artículos agregados, permite **aumentar/disminuir** cantidades (el inventario se actualiza en cada cambio), quitar artículos, vaciar el carrito (devuelve el stock) y finalizar la compra.
- **Estado del artículo:** `Disponible`, `Pocas unidades` (≤ 5) o `Agotado` (0), calculado desde el stock.
- Los datos persisten en `localStorage`.

## Estructura del proyecto

```
src/
├── components/   # Piezas reutilizables (Layout, TopNav, BottomNav, CategoryFilter,
│                 #   InventoryTable, QuantityControl, StockBadge, ProductThumb, ...)
├── context/      # InventoryContext (provider + hook) e inventoryReducer (lógica pura)
├── data/         # Inventario inicial y categorías
├── pages/        # Home, About, Contact, Inventory, ProductDetail, AddProduct, Cart
├── utils/        # Formato de moneda y cálculo de estado
├── App.jsx       # Definición de rutas
└── main.jsx      # Punto de entrada
```

### Reglas del inventario (`inventoryReducer.js`)

| Acción | Efecto en inventario |
|--------|----------------------|
| `ADD_TO_CART` / `INCREMENT` | resta stock |
| `DECREMENT` / `REMOVE_FROM_CART` / `CLEAR_CART` | devuelve stock |
| `CHECKOUT` | vacía el carrito (el stock queda descontado) |
| `ADD_PRODUCT` | agrega un artículo nuevo |

## Ejecutar en local

```bash
npm install
npm run dev
npm run build
```

## Publicación en GitHub Pages

```bash
npm run deploy
```


