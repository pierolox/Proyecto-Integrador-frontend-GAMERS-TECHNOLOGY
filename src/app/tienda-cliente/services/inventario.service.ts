import { Injectable } from '@angular/core';

import {
  CATEGORIAS,
  SUBCATEGORIAS,
  PRODUCTOS,
  Categoria,
  Subcategoria,
  Producto
} from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  obtenerCategorias(): Categoria[] {
    return CATEGORIAS;
  }

  obtenerSubcategorias(): Subcategoria[] {
    return SUBCATEGORIAS;
  }

  obtenerProductos(): Producto[] {
    return PRODUCTOS;
  }

  obtenerProductoPorId(id: number): Producto | undefined {

    return PRODUCTOS.find(
      p => p.id === id
    );
  }

  obtenerProductosNuevos(): Producto[] {

    return PRODUCTOS.filter(
      p => p.esNuevo
    );
  }

  obtenerProductosEnOferta(): Producto[] {

    return PRODUCTOS.filter(
      p => p.precioAnterior !== undefined
    );
  }

  obtenerSubcategoriasPorCategoria(
    categoriaId: number
  ): Subcategoria[] {

    return SUBCATEGORIAS.filter(
      s => s.categoriaId === categoriaId
    );
  }

  obtenerProductosPorSubcategoria(
    subcategoriaId: number
  ): Producto[] {

    return PRODUCTOS.filter(
      p => p.subcategoriaId === subcategoriaId
    );
  }

  obtenerCantidadProductosCategoria(
    categoriaId: number
  ): number {

    const subIds = SUBCATEGORIAS
      .filter(s => s.categoriaId === categoriaId)
      .map(s => s.id);

    return PRODUCTOS.filter(
      p => subIds.includes(p.subcategoriaId)
    ).length;
  }
}