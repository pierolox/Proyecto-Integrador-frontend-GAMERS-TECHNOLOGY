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

export interface Producto {
  id: number;

  nombre: string;
  descripcion: string;

  precio: number;
  stock: number;

  categoriaId: number;
  subcategoriaId: number;

  imagen: string;
  estado: Estado;
}