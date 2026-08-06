export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  colorInicio: string;
  colorFin: string;
}

export interface Subcategoria {
  id: number;
  categoriaId: number;
  nombre: string;
  descripcion: string;
}

export interface Producto {
  id: number;

  categoriaId: number;
  subcategoriaId: number;

  nombre: string;
  descripcion: string;

  precio: number;
  precioAnterior?: number;

  stock: number;

  imagen: string;

  estado: 'Activo' | 'Inactivo';

  icono: string;

  colorInicio: string;
  colorFin: string;

  esNuevo?: boolean;
  descuento?: number;
  rating: number;
}