import { Injectable, signal } from "@angular/core";
import { CATEGORIAS, SUBCATEGORIAS, PRODUCTOS } from "../data/mock-data";
import {
  Categoria,
  Subcategoria,
  Producto,
} from "../../shared/models/inventario.models";

@Injectable({
  providedIn: "root",
})
export class InventarioService {
  private categorias = signal<Categoria[]>([...CATEGORIAS]);
  private subcategorias = signal<Subcategoria[]>([...SUBCATEGORIAS]);
  private productos = signal<Producto[]>([...PRODUCTOS]);

  agregarSubcategoria(subcategoria: Subcategoria) {
    this.subcategorias.update((lista) => [...lista, subcategoria]);
  }

  actualizarSubcategoria(subcategoria: Subcategoria) {
    this.subcategorias.update((lista) =>
      lista.map((s) => (s.id === subcategoria.id ? subcategoria : s)),
    );
  }

  eliminarSubcategoria(id: number) {
    this.subcategorias.update((lista) => lista.filter((s) => s.id !== id));
  }

  subcategoriasSignal() {
    return this.subcategorias;
  }

  obtenerCategorias(): Categoria[] {
    return this.categorias();
  }

  categoriasSignal() {
    return this.categorias;
  }

  agregarCategoria(categoria: Categoria) {
    this.categorias.update((lista) => [...lista, categoria]);
  }

  actualizarCategoria(categoria: Categoria) {
    this.categorias.update((lista) =>
      lista.map((c) => (c.id === categoria.id ? categoria : c)),
    );
  }

  eliminarCategoria(id: number) {
    this.categorias.update((lista) => lista.filter((c) => c.id !== id));
  }

  obtenerSubcategorias(): Subcategoria[] {
    return this.subcategorias();
  }

  obtenerProductos(): Producto[] {
    return this.productos();
  }

  obtenerProductoPorId(id: number) {
    return this.productos().find((p) => p.id === id);
  }

  obtenerProductosNuevos(): Producto[] {
    return this.productos().filter((p) => p.esNuevo);
  }

  obtenerProductosEnOferta(): Producto[] {
    return this.productos().filter((p) => p.precioAnterior !== undefined);
  }

  obtenerSubcategoriasPorCategoria(categoriaId: number): Subcategoria[] {
    return this.subcategorias().filter((s) => s.categoriaId === categoriaId);
  }

  obtenerProductosPorSubcategoria(subcategoriaId: number): Producto[] {
    return this.productos().filter((p) => p.subcategoriaId === subcategoriaId);
  }

  obtenerCantidadProductosCategoria(categoriaId: number): number {

    const subIds = this.subcategorias()
      .filter((s) => s.categoriaId === categoriaId)
      .map((s) => s.id);

    return this.productos()
      .filter((p) => subIds.includes(p.subcategoriaId))
      .length;
  }

  obtenerProductosPorCategoria(categoriaId: number) {
    const subIds = this.subcategorias()
      .filter((s) => s.categoriaId === categoriaId)
      .map((s) => s.id);

    return this.productos().filter((p) => subIds.includes(p.subcategoriaId));
  }

  obtenerNombreSubcategoria(subcategoriaId: number): string {
    const sub = this.subcategorias()
      .find((s) => s.id === subcategoriaId);

    return sub?.nombre ?? "";
  }

  // =========================
  // PRODUCTOS
  // =========================

  productosSignal() {
    return this.productos;
  }

  agregarProducto(producto: Producto) {
    this.productos.update((lista) => [...lista, producto]);
  }

  actualizarProducto(producto: Producto) {
    this.productos.update((lista) =>
      lista.map((p) => (p.id === producto.id ? producto : p)),
    );
  }

  eliminarProducto(id: number) {
    this.productos.update((lista) => lista.filter((p) => p.id !== id));
  }

  obtenerProductosFiltrados(
    subcategoriaId: number | null,
    soloNuevos: boolean,
    orden: "relevancia" | "precio-asc" | "precio-desc",
  ): Producto[] {
    let lista = [...this.productos()];

    // Filtrar nuevos

    if (soloNuevos) {
      lista = lista.filter((p) => p.esNuevo);
    }

    // Filtrar subcategoría

    if (subcategoriaId != null) {
      lista = lista.filter((p) => p.subcategoriaId === subcategoriaId);
    }

    // Ordenar

    switch (orden) {
      case "precio-asc":
        lista.sort((a, b) => a.precio - b.precio);

        break;

      case "precio-desc":
        lista.sort((a, b) => b.precio - a.precio);

        break;
    }

    return lista;
  }

  obtenerCantidadProductosPorCategoria(categoriaId: number): number {
    const subIds = this.subcategorias()
      .filter((s) => s.categoriaId === categoriaId)
      .map((s) => s.id);

    return this.productos()
      .filter((p) => subIds.includes(p.subcategoriaId))
      .length;
  }
}
