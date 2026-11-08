import PageHeader from '../components/PageHeader.jsx'

const valores = [
  { icono: '🌱', titulo: 'Frescura', texto: 'Seleccionamos frutas, verduras y panes todos los días.' },
  { icono: '🤝', titulo: 'Cercanía', texto: 'Somos un equipo de barrio que conoce a sus clientes.' },
  { icono: '📦', titulo: 'Orden', texto: 'Un inventario al día para que nunca falte lo que necesitas.' },
]

export default function About() {
  return (
    <>
      <PageHeader titulo="Quiénes somos" subtitulo="Un supermercado de barrio con gestión moderna." />
      <div className="card p-6 sm:p-8">
        <p className="max-w-2xl text-stone-700">
          Goodies nació con una idea simple: tener siempre productos de calidad y saber exactamente qué hay en
          las estanterías. Este sistema de inventario permite controlar el stock, registrar nuevos artículos y
          simular las compras de los clientes.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {valores.map((v) => (
          <div key={v.titulo} className="card p-5">
            <span aria-hidden className="text-3xl">{v.icono}</span>
            <h2 className="mt-2 font-bold text-fresh-900">{v.titulo}</h2>
            <p className="mt-1 text-sm text-stone-600">{v.texto}</p>
          </div>
        ))}
      </div>
    </>
  )
}
