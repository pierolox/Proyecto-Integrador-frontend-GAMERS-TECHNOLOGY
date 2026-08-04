import { Injectable, signal } from '@angular/core';
import { CATEGORIAS, SUBCATEGORIAS, PRODUCTOS } from '../data/mock-data';
import { Categoria, Subcategoria, Producto } from '../../shared/models/inventario.models';

@Injectable({
  providedIn: 'root'
})

export class InventarioService {

  private categorias = signal<Categoria[]>([
    ...CATEGORIAS
  ]);

  private subcategorias = signal<Subcategoria[]>([
    ...SUBCATEGORIAS
  ]);

  private productos = signal<Producto[]>([
    ...PRODUCTOS
  ]);

  obtenerCategorias(): Categoria[] {
    return this.categorias();
  }

  categoriasSignal() {
    return this.categorias;
  }

  agregarCategoria(categoria: Categoria) {

    this.categorias.update(lista => [
      ...lista,
      categoria
    ]);
  }

  actualizarCategoria(categoria: Categoria) {

    this.categorias.update(lista =>
      lista.map(c =>
        c.id === categoria.id
          ? categoria
          : c
      )
    );
  }

  eliminarCategoria(id: number) {

    this.categorias.update(lista =>
      lista.filter(c => c.id !== id)
    );
  }

  obtenerSubcategorias(): Subcategoria[] {
    return this.subcategorias();
  }

  obtenerProductos(): Producto[] {
    return this.productos();
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