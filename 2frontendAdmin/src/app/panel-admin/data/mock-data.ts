// Datos de prueba compartidos entre las secciones del Panel del Administrador.
// ATENCIÓN: este archivo contiene solo datos de relleno del frontend.
// No provienen de ninguna API ni base de datos; deben reemplazarse por
// datos reales del backend cuando la aplicación esté conectada.

export type Estado = 'Activo' | 'Inactivo';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  estado: Estado;
}

export interface Subcategoria {
  id: number;
  categoriaId: number;
  nombre: string;
  descripcion: string;
  estado: Estado;
}

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: 1, nombre: 'Procesadores', descripcion: 'CPUs de escritorio y laptop', estado: 'Activo' },
  { id: 2, nombre: 'Tarjetas Gráficas', descripcion: 'GPUs dedicadas para gaming y diseño', estado: 'Activo' },
  { id: 3, nombre: 'Memorias RAM', descripcion: 'Memoria RAM para PC y laptop', estado: 'Activo' },
  { id: 4, nombre: 'Periféricos', descripcion: 'Teclados, mouse y audífonos', estado: 'Inactivo' },
];

export const SUBCATEGORIAS_MOCK: Subcategoria[] = [
  { id: 1, categoriaId: 1, nombre: 'Ryzen 5000 Series', descripcion: 'Procesadores AMD Ryzen serie 5000', estado: 'Activo' },
  { id: 2, categoriaId: 1, nombre: 'Ryzen 7000 Series', descripcion: 'Procesadores AMD Ryzen serie 7000', estado: 'Activo' },
  { id: 3, categoriaId: 1, nombre: 'Intel 14.ª Generación', descripcion: 'Procesadores Intel Core 14.ª Gen', estado: 'Activo' },
  { id: 4, categoriaId: 1, nombre: 'Intel Core Ultra', descripcion: 'Procesadores Intel Core Ultra', estado: 'Activo' },
  { id: 5, categoriaId: 2, nombre: 'RTX 3000', descripcion: 'Tarjetas NVIDIA GeForce RTX serie 3000', estado: 'Activo' },
  { id: 6, categoriaId: 2, nombre: 'RTX 4000', descripcion: 'Tarjetas NVIDIA GeForce RTX serie 4000', estado: 'Activo' },
  { id: 7, categoriaId: 2, nombre: 'RTX 5000', descripcion: 'Tarjetas NVIDIA GeForce RTX serie 5000', estado: 'Activo' },
  { id: 8, categoriaId: 2, nombre: 'Radeon RX 7000', descripcion: 'Tarjetas AMD Radeon serie RX 7000', estado: 'Activo' },
  { id: 9, categoriaId: 3, nombre: 'DDR4', descripcion: 'Memorias RAM DDR4', estado: 'Activo' },
  { id: 10, categoriaId: 3, nombre: 'DDR5', descripcion: 'Memorias RAM DDR5', estado: 'Activo' },
  { id: 11, categoriaId: 4, nombre: 'Audífonos', descripcion: 'Audífonos gamer con micrófono', estado: 'Inactivo' },
];
