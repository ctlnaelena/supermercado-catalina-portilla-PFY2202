// Inventario inicial del supermercado (precios en CLP)
export const CATEGORIAS = [
  'Frutas y verduras',
  'Lácteos',
  'Panadería',
  'Carnes',
  'Despensa',
  'Bebidas',
  'Snacks',
  'Limpieza',
]

export const ICONOS_CATEGORIA = {
  'Frutas y verduras': '🥑',
  'Lácteos': '🥛',
  'Panadería': '🥖',
  'Carnes': '🥩',
  'Despensa': '🍝',
  'Bebidas': '🥤',
  'Snacks': '🍫',
  'Limpieza': '🧼',
}

export const initialProducts = [
  { id: 1, nombre: 'Palta Hass 1 kg', marca: 'Agrosuper Frescos', tipo: 'Frutas y verduras', precio: 4990, stock: 25, descripcion: 'Paltas Hass de la zona central, listas para consumir en 2 a 3 días.' },
  { id: 2, nombre: 'Plátano 1 kg', marca: 'Del Huerto', tipo: 'Frutas y verduras', precio: 1490, stock: 40, descripcion: 'Plátanos de Ecuador.' },
  { id: 3, nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', precio: 1190, stock: 60, descripcion: 'Leche entera UHT en caja, ideal para el desayuno.' },
  { id: 4, nombre: 'Yoghurt frutilla 120 g', marca: 'Soprole', tipo: 'Lácteos', precio: 450, stock: 5, descripcion: 'Yoghurt batido sabor frutilla, bajo en grasa.' },
  { id: 5, nombre: 'Queso gauda laminado 250 g', marca: 'Colun', tipo: 'Lácteos', precio: 3290, stock: 18, descripcion: 'Queso gauda en láminas, perfecto para sándwiches.' },
  { id: 6, nombre: 'Marraqueta (unidad)', marca: 'Panadería Propia', tipo: 'Panadería', precio: 220, stock: 120, descripcion: 'Pan marraqueta crujiente, horneado todos los días.' },
  { id: 7, nombre: 'Hallulla (unidad)', marca: 'Panadería Propia', tipo: 'Panadería', precio: 200, stock: 90, descripcion: 'Hallulla tradicional, suave por dentro.' },
  { id: 8, nombre: 'Posta rosada 1 kg', marca: 'Cuisine & Co', tipo: 'Carnes', precio: 9990, stock: 12, descripcion: 'Corte de vacuno ideal para asado al horno o plateada.' },
  { id: 9, nombre: 'Pechuga de pollo 1 kg', marca: 'Ariztía', tipo: 'Carnes', precio: 5490, stock: 0, descripcion: 'Pechuga deshuesada y sin piel.' },
  { id: 10, nombre: 'Fideos espagueti 400 g', marca: 'Carozzi', tipo: 'Despensa', precio: 1090, stock: 80, descripcion: 'Fideos de sémola de trigo duro, cocción en 9 minutos.' },
  { id: 11, nombre: 'Arroz grado 1 1 kg', marca: 'Tucapel', tipo: 'Despensa', precio: 1790, stock: 55, descripcion: 'Arroz grano largo y angosto, no se pasa.' },
  { id: 12, nombre: 'Aceite de maravilla 1 L', marca: 'Chef', tipo: 'Despensa', precio: 2790, stock: 30, descripcion: 'Aceite vegetal de maravilla para cocinar y freír.' },
  { id: 13, nombre: 'Agua mineral sin gas 1,6 L', marca: 'Cachantun', tipo: 'Bebidas', precio: 990, stock: 70, descripcion: 'Agua mineral natural sin gas.' },
  { id: 14, nombre: 'Bebida cola 3 L', marca: 'Coca-Cola', tipo: 'Bebidas', precio: 3190, stock: 4, descripcion: 'Bebida gaseosa sabor cola, formato familiar.' },
  { id: 15, nombre: 'Papas fritas clásicas 140 g', marca: 'Lays', tipo: 'Snacks', precio: 1890, stock: 35, descripcion: 'Papas fritas crocantes con sal.' },
  { id: 16, nombre: 'Chocolate Sahne-Nuss 250 g', marca: 'Nestlé', tipo: 'Snacks', precio: 3590, stock: 22, descripcion: 'Tableta de chocolate con leche y nueces.' },
  { id: 17, nombre: 'Detergente líquido 3 L', marca: 'Omo', tipo: 'Limpieza', precio: 8990, stock: 14, descripcion: 'Detergente líquido para ropa blanca y de color.' },
  { id: 18, nombre: 'Lavalozas limón 750 ml', marca: 'Quix', tipo: 'Limpieza', precio: 1990, stock: 3, descripcion: 'Lavalozas concentrado con aroma a limón.' },
]
