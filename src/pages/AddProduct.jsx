import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { CATEGORIAS } from '../data/initialProducts.js'
import { useInventory } from '../context/InventoryContext.jsx'

const vacio = { nombre: '', marca: '', tipo: '', precio: '', stock: '', descripcion: '' }

function validar(f) {
  const e = {}
  if (f.nombre.trim().length < 3) e.nombre = 'Ingresa un nombre de al menos 3 caracteres.'
  if (f.marca.trim().length < 2) e.marca = 'Ingresa la marca.'
  if (!f.tipo) e.tipo = 'Selecciona un tipo de producto.'
  if (!(Number(f.precio) > 0)) e.precio = 'El precio debe ser mayor a 0.'
  if (!Number.isInteger(Number(f.stock)) || f.stock === '' || Number(f.stock) < 0) e.stock = 'El stock debe ser un entero de 0 o más.'
  return e
}

function Campo({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-stone-700">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}

export default function AddProduct() {
  const { addProduct } = useInventory()
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [agregado, setAgregado] = useState(null)

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const errs = validar(form)
    setErrores(errs)
    if (Object.keys(errs).length) return
    addProduct({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim() || 'Sin descripción.',
    })
    setAgregado(form.nombre.trim())
    setForm(vacio)
  }

  return (
    <>
      <PageHeader titulo="Agregar artículo" subtitulo="Ingresa un nuevo producto al inventario del supermercado." />
      {agregado && (
        <p role="status" className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-fresh-50 px-4 py-3 text-sm text-fresh-900">
          ✅ «{agregado}» fue agregado al inventario.
          <Link to="/inventario" className="font-bold underline">Ver inventario</Link>
        </p>
      )}
      <form onSubmit={enviar} noValidate className="card grid max-w-2xl gap-4 p-5 sm:grid-cols-2 sm:p-8">
        <Campo label="Nombre" error={errores.nombre}>
          <input name="nombre" className="input" value={form.nombre} onChange={cambiar} placeholder="Ej: Leche descremada 1 L" />
        </Campo>
        <Campo label="Marca" error={errores.marca}>
          <input name="marca" className="input" value={form.marca} onChange={cambiar} placeholder="Ej: Soprole" />
        </Campo>
        <Campo label="Tipo de producto" error={errores.tipo}>
          <select name="tipo" className="input" value={form.tipo} onChange={cambiar}>
            <option value="">Selecciona…</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Campo>
        <Campo label="Precio (CLP)" error={errores.precio}>
          <input name="precio" type="number" min="1" className="input" value={form.precio} onChange={cambiar} placeholder="1990" />
        </Campo>
        <Campo label="Stock inicial" error={errores.stock}>
          <input name="stock" type="number" min="0" step="1" className="input" value={form.stock} onChange={cambiar} placeholder="20" />
        </Campo>
        <div className="sm:col-span-2">
          <Campo label="Descripción (opcional)">
            <textarea name="descripcion" rows="3" className="input" value={form.descripcion} onChange={cambiar} />
          </Campo>
        </div>
        <div className="flex gap-3 sm:col-span-2">
          <button type="submit" className="btn-primary">Guardar artículo</button>
          <button type="button" className="btn-secondary" onClick={() => { setForm(vacio); setErrores({}) }}>Limpiar</button>
        </div>
      </form>
    </>
  )
}
