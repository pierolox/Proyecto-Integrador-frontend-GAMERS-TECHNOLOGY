import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

// Forma en la que el backend serializa Subcategoria
interface SubcategoriaApi {
  idSubcategoria: number;
  nombre: string;
  descripcion: string;
  idCategoria: number;
}

function subcategoriaApiAFrontend(s: SubcategoriaApi): Subcategoria {
  return {
    id: s.idSubcategoria,
    categoriaId: s.idCategoria,
    nombre: s.nombre,
    descripcion: s.descripcion ?? "",
  };
}

function subcategoriaFrontendABackend(s: Omit<Subcategoria, "id"> | Subcategoria) {
  return {
    nombre: s.nombre,
    descripcion: s.descripcion,
    idCategoria: s.categoriaId,
  };
}

// Forma en la que el backend serializa Producto
interface ProductoApi {
  id: number;
  subcategoriaId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior: number | null;
  stock: number;
  imagen: string | null;
  estado: "Activo" | "Inactivo";
  icono: string | null;
  colorInicio: string | null;
  colorFin: string | null;
  esNuevo: boolean | null;
  rating: number | null;
}

function productoApiAFrontend(p: ProductoApi, subcategorias: Subcategoria[]): Producto {
  const categoriaId =
    subcategorias.find((s) => s.id === p.subcategoriaId)?.categoriaId ?? 0;

  const descuento =
    p.precioAnterior != null && p.precioAnterior > p.precio
      ? Math.round((1 - p.precio / p.precioAnterior) * 100)
      : undefined;

  return {
    id: p.id,
    categoriaId,
    subcategoriaId: p.subcategoriaId,
    nombre: p.nombre,
    descripcion: p.descripcion ?? "",
    precio: p.precio,
    precioAnterior: p.precioAnterior ?? undefined,
    stock: p.stock,
    imagen: p.imagen ?? "",
    estado: p.estado === "Inactivo" ? "Inactivo" : "Activo",
    icono: p.icono ?? "📦",
    colorInicio: p.colorInicio ?? "#6366f1",
    colorFin: p.colorFin ?? "#4338ca",
    esNuevo: p.esNuevo ?? undefined,
    descuento,
    rating: p.rating ?? 0,
  };
}

function productoFrontendABackend(p: Omit<Producto, "id"> | Producto) {
  return {
    subcategoriaId: p.subcategoriaId,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    precioAnterior: p.precioAnterior ?? null,
    stock: p.stock,
    imagen: p.imagen,
    estado: p.estado,
    icono: p.icono,
    colorInicio: p.colorInicio,
    colorFin: p.colorFin,
    esNuevo: p.esNuevo ?? false,
    rating: p.rating,
  };
}

@Injectable({
  providedIn: "root",
})
export class InventarioService {
  private categoriasUrl = `${environment.apiUrl}/categorias`;
  private subcategoriasUrl = `${environment.apiUrl}/subcategorias`;
  private productosUrl = `${environment.apiUrl}/productos`;

  private categorias = signal<Categoria[]>([]);
  private subcategorias = signal<Subcategoria[]>([]);
  private productos = signal<Producto[]>([]);

  constructor(private http: HttpClient) {
    this.cargarCategorias();
    this.cargarSubcategorias();
  }

  private cargarCategorias() {
    this.http.get<CategoriaApi[]>(this.categoriasUrl).subscribe({
      next: (lista) => this.categorias.set(lista.map(categoriaApiAFrontend)),
      error: (err) => console.error("No se pudieron cargar las categorías", err),
    });
  }

  private cargarSubcategorias() {
    this.http.get<SubcategoriaApi[]>(this.subcategoriasUrl).subscribe({
      next: (lista) => {
        const subcategorias = lista.map(subcategoriaApiAFrontend);
        this.subcategorias.set(subcategorias);
        // Los productos necesitan las subcategorías ya cargadas para
        // poder derivar su categoriaId, así que se encadenan aquí.
        this.cargarProductos(subcategorias);
      },
      error: (err) => console.error("No se pudieron cargar las subcategorías", err),
    });
  }

  private cargarProductos(subcategorias: Subcategoria[]) {
    this.http.get<ProductoApi[]>(this.productosUrl).subscribe({
      next: (lista) =>
        this.productos.set(lista.map((p) => productoApiAFrontend(p, subcategorias))),
      error: (err) => console.error("No se pudieron cargar los productos", err),
    });
  }

  subcategoriasSignal() {
    return this.subcategorias;
  }

  agregarSubcategoria(subcategoria: Omit<Subcategoria, "id">) {
    this.http
      .post<SubcategoriaApi>(this.subcategoriasUrl, subcategoriaFrontendABackend(subcategoria))
      .subscribe({
        next: (creada) =>
          this.subcategorias.update((lista) => [subcategoriaApiAFrontend(creada), ...lista]),
        error: (err) => console.error("No se pudo crear la subcategoría", err),
      });
  }

  actualizarSubcategoria(subcategoria: Subcategoria) {
    this.http
      .put<SubcategoriaApi>(
        `${this.subcategoriasUrl}/${subcategoria.id}`,
        subcategoriaFrontendABackend(subcategoria),
      )
      .subscribe({
        next: (actualizada) =>
          this.subcategorias.update((lista) =>
            lista.map((s) => (s.id === subcategoria.id ? subcategoriaApiAFrontend(actualizada) : s)),
          ),
        error: (err) => console.error("No se pudo actualizar la subcategoría", err),
      });
  }

  eliminarSubcategoria(id: number) {
    this.http.delete<boolean>(`${this.subcategoriasUrl}/${id}`).subscribe({
      next: () => this.subcategorias.update((lista) => lista.filter((s) => s.id !== id)),
      error: (err) => console.error("No se pudo eliminar la subcategoría", err),
    });
  }

  obtenerCategorias(): Categoria[] {
    return this.categorias();
  }

  categoriasSignal() {
    return this.categorias;
  }

  agregarCategoria(categoria: Omit<Categoria, "id">) {
    this.http
      .post<CategoriaApi>(this.categoriasUrl, categoriaFrontendABackend(categoria))
      .subscribe({
        next: (creada) =>
          this.categorias.update((lista) => [...lista, categoriaApiAFrontend(creada)]),
        error: (err) => console.error("No se pudo crear la categoría", err),
      });
  }

  actualizarCategoria(categoria: Categoria) {
    this.http
      .put<CategoriaApi>(`${this.categoriasUrl}/${categoria.id}`, categoriaFrontendABackend(categoria))
      .subscribe({
        next: (actualizada) =>
          this.categorias.update((lista) =>
            lista.map((c) => (c.id === categoria.id ? categoriaApiAFrontend(actualizada) : c)),
          ),
        error: (err) => console.error("No se pudo actualizar la categoría", err),
      });
  }

  eliminarCategoria(id: number) {
    this.http.delete<boolean>(`${this.categoriasUrl}/${id}`).subscribe({
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

  agregarProducto(producto: Omit<Producto, "id">) {
    this.http
      .post<ProductoApi>(this.productosUrl, productoFrontendABackend(producto))
      .subscribe({
        next: (creado) =>
          this.productos.update((lista) => [
            productoApiAFrontend(creado, this.subcategorias()),
            ...lista,
          ]),
        error: (err) => console.error("No se pudo crear el producto", err),
      });
  }

  actualizarProducto(producto: Producto) {
    this.http
      .put<ProductoApi>(`${this.productosUrl}/${producto.id}`, productoFrontendABackend(producto))
      .subscribe({
        next: (actualizado) =>
          this.productos.update((lista) =>
            lista.map((p) =>
              p.id === producto.id ? productoApiAFrontend(actualizado, this.subcategorias()) : p,
            ),
          ),
        error: (err) => console.error("No se pudo actualizar el producto", err),
      });
  }

  eliminarProducto(id: number) {
    this.http.delete<boolean>(`${this.productosUrl}/${id}`).subscribe({
      next: () => this.productos.update((lista) => lista.filter((p) => p.id !== id)),
      error: (err) => console.error("No se pudo eliminar el producto", err),
    });
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