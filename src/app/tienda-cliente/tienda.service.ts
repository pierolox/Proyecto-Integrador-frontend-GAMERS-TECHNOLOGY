import { Injectable } from '@angular/core';

import {
  CATEGORIAS,
  SUBCATEGORIAS,
  PRODUCTOS,
  Categoria,
  Subcategoria,
  Producto
} from './data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  getCategorias(): Categoria[] {
    return CATEGORIAS;
  }

  getSubcategorias(): Subcategoria[] {
    return SUBCATEGORIAS;
  }

  getProductos(): Producto[] {
    return PRODUCTOS;
  }

  obtenerCategoria(id: number): Categoria | undefined {
    return CATEGORIAS.find(c => c.id === id);
  }

  obtenerSubcategoria(id: number): Subcategoria | undefined {
    return SUBCATEGORIAS.find(s => s.id === id);
  }

  obtenerSubcategoriasPorCategoria(categoriaId: number): Subcategoria[] {
    return SUBCATEGORIAS.filter(
      s => s.categoriaId === categoriaId
    );
  }

  obtenerProductosPorSubcategoria(subcategoriaId: number): Producto[] {
    return PRODUCTOS.filter(
      p => p.subcategoriaId === subcategoriaId
    );
  }

  obtenerNombreSubcategoria(id: number): string {
    const sub = this.obtenerSubcategoria(id);

    return sub ? sub.nombre : '';
  }

  obtenerNombreCategoria(subcategoriaId: number): string {
    const sub = this.obtenerSubcategoria(subcategoriaId);

    if (!sub) return '';

    const categoria = this.obtenerCategoria(sub.categoriaId);

    return categoria ? categoria.nombre : '';
  }

  contarProductosCategoria(categoriaId: number): number {
    const subs = this.obtenerSubcategoriasPorCategoria(categoriaId);
    let cantidad = 0;

    for (const sub of subs) {
      cantidad += this.obtenerProductosPorSubcategoria(sub.id).length;
    }

    return cantidad;
  }

  contarProductosSubcategoria(subcategoriaId: number): number {
    return this.obtenerProductosPorSubcategoria(subcategoriaId).length;
  }
}