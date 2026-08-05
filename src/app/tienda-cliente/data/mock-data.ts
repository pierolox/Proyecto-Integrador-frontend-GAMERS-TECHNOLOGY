import { Categoria, Subcategoria, Producto } from '../../shared/models/inventario.models';

export const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: "Periféricos", descripcion: "Mouse, teclados y accesorios", icono: "🖱️", colorInicio: "#6366f1", colorFin: "#4338ca" },
  { id: 2, nombre: "Procesadores", descripcion: "AMD e Intel", icono: "⚙️", colorInicio: "#f97316", colorFin: "#c2410c" },
  { id: 3, nombre: "Tarjetas Gráficas", descripcion: "NVIDIA y AMD", icono: "🎮", colorInicio: "#22d3ee", colorFin: "#0891b2" },
  { id: 4, nombre: "Monitores", descripcion: "Monitores Gamer", icono: "🖥️", colorInicio: "#ec4899", colorFin: "#be185d" },
  { id: 5, nombre: "Consolas", descripcion: "PlayStation y Xbox", icono: "🕹️", colorInicio: "#a855f7", colorFin: "#7e22ce" }
];

export const SUBCATEGORIAS: Subcategoria[] = [
  { id: 1, categoriaId: 1, nombre: "Mouse", descripcion: "Mouse Gamer" },
  { id: 2, categoriaId: 1, nombre: "Teclados", descripcion: "Teclados Mecánicos" },
  { id: 3, categoriaId: 1, nombre: "Audífonos", descripcion: "Headsets Gamer" },
  { id: 4, categoriaId: 1, nombre: "Micrófonos", descripcion: "Micrófonos para Streaming" },
  { id: 5, categoriaId: 2, nombre: "Ryzen 7000", descripcion: "AMD Ryzen Serie 7000" },
  { id: 6, categoriaId: 2, nombre: "Intel Core Ultra", descripcion: "Intel Core Ultra" },
  { id: 7, categoriaId: 3, nombre: "RTX 4000", descripcion: "NVIDIA RTX 4000" },
  { id: 8, categoriaId: 3, nombre: "RTX 5000", descripcion: "NVIDIA RTX 5000" },
  { id: 9, categoriaId: 4, nombre: "144 Hz", descripcion: "Monitores 144 Hz" },
  { id: 10, categoriaId: 4, nombre: "165 Hz", descripcion: "Monitores 165 Hz" },
  { id: 11, categoriaId: 5, nombre: "PlayStation", descripcion: "Consolas Sony" },
  { id: 12, categoriaId: 5, nombre: "Xbox", descripcion: "Consolas Microsoft" }
];

export const PRODUCTOS: Producto[] = [
  { id: 1, categoriaId: 1, subcategoriaId: 1, nombre: "Mouse Gamer RGB Vortex", descripcion: "Mouse RGB", precio: 89.90, stock: 25, imagen: "", estado: "Activo", icono: "🖱️", colorInicio: "#6366f1", colorFin: "#4338ca", rating: 4.6, esNuevo: true },
  { id: 2, categoriaId: 1, subcategoriaId: 2, nombre: "Teclado Mecánico Nova RGB", descripcion: "Teclado Mecánico", precio: 159.90, precioAnterior: 189.90, stock: 0, imagen: "", estado: "Activo", icono: "⌨️", colorInicio: "#6366f1", colorFin: "#4338ca", rating: 4.8, descuento: 16 },
  { id: 3, categoriaId: 1, subcategoriaId: 3, nombre: "Audífonos Gamer Surge", descripcion: "Audífonos Gamer", precio: 79.90, stock: 0, imagen: "", estado: "Activo", icono: "🎧", colorInicio: "#6366f1", colorFin: "#4338ca", rating: 4.5 },
  { id: 4, categoriaId: 1, subcategoriaId: 4, nombre: "Micrófono Streaming Pro", descripcion: "Micrófono", precio: 249.90, stock: 0, imagen: "", estado: "Activo", icono: "🎙️", colorInicio: "#6366f1", colorFin: "#4338ca", rating: 4.7 },
  { id: 5, categoriaId: 2, subcategoriaId: 5, nombre: "Ryzen 7 7800X3D", descripcion: "Procesador AMD", precio: 1699, stock: 0, imagen: "", estado: "Activo", icono: "⚙️", colorInicio: "#f97316", colorFin: "#c2410c", rating: 4.9 },
  { id: 6, categoriaId: 2, subcategoriaId: 6, nombre: "Core Ultra 7 265K", descripcion: "Procesador Intel", precio: 1899, stock: 0, imagen: "", estado: "Activo", icono: "⚙️", colorInicio: "#f97316", colorFin: "#c2410c", rating: 4.8 },
  { id: 7, categoriaId: 3, subcategoriaId: 7, nombre: "RTX 4060 Turbo OC", descripcion: "Tarjeta Gráfica", precio: 1899, stock: 0, imagen: "", estado: "Activo", icono: "🎮", colorInicio: "#22d3ee", colorFin: "#0891b2", rating: 4.8 },
  { id: 8, categoriaId: 3, subcategoriaId: 8, nombre: "RTX 5070", descripcion: "Tarjeta Gráfica", precio: 3299, stock: 0, imagen: "", estado: "Activo", icono: "🎮", colorInicio: "#22d3ee", colorFin: "#0891b2", rating: 4.9 },
  { id: 9, categoriaId: 4, subcategoriaId: 9, nombre: "Monitor IPS 24'' 144Hz", descripcion: "Monitor Gamer", precio: 649, stock: 0, imagen: "", estado: "Activo", icono: "🖥️", colorInicio: "#ec4899", colorFin: "#be185d", rating: 4.6 },
  { id: 10, categoriaId: 4, subcategoriaId: 10, nombre: "Monitor Curvo 27'' 165Hz", descripcion: "Monitor Gamer", precio: 899, stock: 0, imagen: "", estado: "Activo", icono: "🖥️", colorInicio: "#ec4899", colorFin: "#be185d", rating: 4.7 },
  { id: 11, categoriaId: 5, subcategoriaId: 11, nombre: "PlayStation 5", descripcion: "Consola Sony", precio: 2499, stock: 0, imagen: "", estado: "Activo", icono: "🕹️", colorInicio: "#a855f7", colorFin: "#7e22ce", rating: 4.9 },
  { id: 12, categoriaId: 5, subcategoriaId: 12, nombre: "Xbox Series X", descripcion: "Consola Microsoft", precio: 2399, stock: 0, imagen: "", estado: "Activo", icono: "🕹️", colorInicio: "#a855f7", colorFin: "#7e22ce", rating: 4.8 }
];
