import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventoryProvider } from './context/InventoryContext.jsx'
import './index.css'

// HashRouter: funciona en GitHub Pages sin configuración extra del servidor
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </HashRouter>
  </React.StrictMode>,
)
