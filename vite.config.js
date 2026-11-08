import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' permite servir el sitio desde cualquier subruta (gh-pages)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
