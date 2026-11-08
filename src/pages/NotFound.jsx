import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFound() {
  return (
    <EmptyState icono="🧭" titulo="Página no encontrada">
      <Link to="/" className="btn-primary mt-2">Volver al inicio</Link>
    </EmptyState>
  )
}
