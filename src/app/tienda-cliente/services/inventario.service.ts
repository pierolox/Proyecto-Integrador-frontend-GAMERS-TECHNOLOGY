import { Injectable } from '@angular/core';
import { CATEGORIAS, SUBCATEGORIAS, PRODUCTOS } from '../data/mock-data';
import { Categoria, Subcategoria, Producto } from '../models/tienda.models';

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

  obtenerProductosPorCategoria(
    categoriaId: number
  ): Producto[] {

    const subIds = SUBCATEGORIAS
      .filter(s => s.categoriaId === categoriaId)
      .map(s => s.id);

    return PRODUCTOS.filter(
      p => subIds.includes(p.subcategoriaId)
    );
  }

  obtenerNombreSubcategoria(
    subcategoriaId: number
  ): string {
    const sub = SUBCATEGORIAS.find(
      s => s.id === subcategoriaId
    );

    return sub ? sub.nombre : '';
  }

  obtenerProductosFiltrados(
    subcategoriaId: number | null,
    soloNuevos: boolean,
    orden: 'relevancia' | 'precio-asc' | 'precio-desc'
  ): Producto[] {

    let lista = [...PRODUCTOS];

    // Filtrar nuevos

    if (soloNuevos) {
      lista = lista.filter(
        p => p.esNuevo
      );
    }

    // Filtrar subcategoría

    if (subcategoriaId != null) {
      lista = lista.filter(
        p => p.subcategoriaId === subcategoriaId
      );
    }

    // Ordenar

    switch (orden) {
      case 'precio-asc':
        lista.sort(
          (a, b) => a.precio - b.precio
        );

        break;

      case 'precio-desc':
        lista.sort(
          (a, b) => b.precio - a.precio
        );

        break;
    }

    return lista;
  }

  obtenerCantidadProductosPorCategoria(
    categoriaId: number
  ): number {

    const subIds = SUBCATEGORIAS
      .filter(
        s => s.categoriaId === categoriaId
      )
      .map(
        s => s.id
      );

    return PRODUCTOS.filter(
      p => subIds.includes(p.subcategoriaId)
    ).length;
  }
}