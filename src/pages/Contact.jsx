import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function Contact() {
  const [enviado, setEnviado] = useState(false)
  return (
    <>
      <PageHeader titulo="Contáctanos" subtitulo="Escríbenos y te responderemos a la brevedad." />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 font-bold text-fresh-900">Datos de contacto</h2>
          <ul className="grid gap-2 text-sm text-stone-700">
            <li>📍 Av. Providencia 1234, Santiago</li>
            <li>📞 +56 2 2345 6789</li>
            <li>✉️ contacto@goodies.cl</li>
            <li>🕗 Lunes a domingo, 8:00 a 22:00</li>
          </ul>
        </div>
        <form
          className="card grid gap-3 p-6"
          onSubmit={(e) => {
            e.preventDefault()
            setEnviado(true)
            e.target.reset()
          }}
        >
          <input required className="input" placeholder="Tu nombre" aria-label="Nombre" />
          <input required type="email" className="input" placeholder="Tu correo" aria-label="Correo" />
          <textarea required rows="4" className="input" placeholder="Tu mensaje" aria-label="Mensaje" />
          <button className="btn-primary" type="submit">Enviar mensaje</button>
          {enviado && <p role="status" className="text-sm text-fresh-700">✅ ¡Gracias! Recibimos tu mensaje.</p>}
        </form>
      </div>
    </>
  )
}
