import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SUBCATEGORIAS, PRODUCTOS } from "../data/mock-data";
import {
  Categoria,
  Subcategoria,
  Producto,
} from "../../shared/models/inventario.models";
import { environment } from "../../../environments/environment";

// Forma en la que el backend serializa Categoria (id_categoria -> idCategoria)
interface CategoriaApi {
  idCategoria: number;
  nombre: string;
  descripcion: string;
  icono: string | null;
  colorInicio: string | null;
  colorFin: string | null;
}

function categoriaApiAFrontend(c: CategoriaApi): Categoria {
  return {
    id: c.idCategoria,
    nombre: c.nombre,
    descripcion: c.descripcion ?? "",
    icono: c.icono ?? "",
    colorInicio: c.colorInicio ?? "#6366f1",
    colorFin: c.colorFin ?? "#4338ca",
  };
}

function categoriaFrontendABackend(c: Omit<Categoria, "id"> | Categoria) {
  return {
    nombre: c.nombre,
    descripcion: c.descripcion,
    icono: c.icono,
    colorInicio: c.colorInicio,
    colorFin: c.colorFin,
  };
}

@Injectable({
  providedIn: "root",
})
export class InventarioService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  private categorias = signal<Categoria[]>([]);
  private subcategorias = signal<Subcategoria[]>([...SUBCATEGORIAS]);
  private productos = signal<Producto[]>([...PRODUCTOS]);

  constructor(private http: HttpClient) {
    this.cargarCategorias();
  }

  private cargarCategorias() {
    this.http.get<CategoriaApi[]>(this.apiUrl).subscribe({
      next: (lista) => this.categorias.set(lista.map(categoriaApiAFrontend)),
      error: (err) => console.error("No se pudieron cargar las categorías", err),
    });
  }

  subcategoriasSignal() {
    return this.subcategorias;
  }

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

  obtenerCategorias(): Categoria[] {
    return this.categorias();
  }

  categoriasSignal() {
    return this.categorias;
  }

  agregarCategoria(categoria: Omit<Categoria, "id">) {
    this.http
      .post<CategoriaApi>(this.apiUrl, categoriaFrontendABackend(categoria))
      .subscribe({
        next: (creada) =>
          this.categorias.update((lista) => [...lista, categoriaApiAFrontend(creada)]),
        error: (err) => console.error("No se pudo crear la categoría", err),
      });
  }

  actualizarCategoria(categoria: Categoria) {
    this.http
      .put<CategoriaApi>(`${this.apiUrl}/${categoria.id}`, categoriaFrontendABackend(categoria))
      .subscribe({
        next: (actualizada) =>
          this.categorias.update((lista) =>
            lista.map((c) => (c.id === categoria.id ? categoriaApiAFrontend(actualizada) : c)),
          ),
        error: (err) => console.error("No se pudo actualizar la categoría", err),
      });
  }

  eliminarCategoria(id: number) {
    this.http.delete<boolean>(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.categorias.update((lista) => lista.filter((c) => c.id !== id)),
      error: (err) => console.error("No se pudo eliminar la categoría", err),
    });
  }

  obtenerSubcategorias(): Subcategoria[] {
    return this.subcategorias();
  }

  obtenerProductos(): Producto[] {
    return this.productos();
  }

  obtenerProductosPorTexto(texto: string): Producto[] {
    const termino = texto.trim().toLowerCase();

    if (!termino) {
      return this.productos();
    }

    return this.productos().filter((producto) =>
      producto.nombre.toLowerCase().includes(termino) ||
      (producto.descripcion ?? "").toLowerCase().includes(termino),
    );
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