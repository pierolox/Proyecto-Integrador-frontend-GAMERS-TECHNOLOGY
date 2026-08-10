import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto, Categoria, Subcategoria } from '../../shared/models/inventario.models';
import { InventarioService } from '../../tienda-cliente/services/inventario.service';

type ProductoForm = Omit<Producto, 'id'>;

const FORM_VACIO: ProductoForm = {
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  categoriaId: 0,
  subcategoriaId: 0,
  imagen: '',
  estado: 'Activo',
  icono: '📦',
  colorInicio: '#6366f1',
  colorFin: '#4338ca',
  rating: 5
};

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  private inventario = inject(InventarioService);

  categorias = this.inventario.categoriasSignal();
  subcategorias = this.inventario.subcategoriasSignal();
  productos = this.inventario.productosSignal();
  errorGuardado = this.inventario.errorProductoSignal();

  // Nombres de productos con stock < 5, para la alerta visual (HU8).
  productosConStockBajo = computed(() =>
    this.productos()
      .filter((p) => p.stock < 5)
      .map((p) => p.nombre),
  );

  // -------- subida de imagen --------
  subiendoImagen = signal(false);
  errorImagen = signal<string | null>(null);

  resolverUrlImagen(imagen: string | null | undefined): string | null {
    return this.inventario.resolverUrlImagen(imagen);
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!tiposPermitidos.includes(archivo.type)) {
      this.errorImagen.set('Formato no permitido. Usa JPG, PNG, WEBP o GIF.');
      input.value = '';
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      this.errorImagen.set('La imagen no puede pesar más de 5MB.');
      input.value = '';
      return;
    }

    this.errorImagen.set(null);
    this.subiendoImagen.set(true);

    this.inventario.subirImagenProducto(archivo).subscribe({
      next: (res) => {
        this.form.imagen = res.url;
        this.subiendoImagen.set(false);
      },
      error: (err) => {
        console.error('No se pudo subir la imagen', err);
        this.errorImagen.set(err?.error?.mensaje ?? 'No se pudo subir la imagen. Intenta de nuevo.');
        this.subiendoImagen.set(false);
      },
    });

    input.value = '';
  }

  quitarImagen() {
    this.form.imagen = '';
    this.errorImagen.set(null);
  }

  // -------- búsqueda --------
  busqueda = signal('');

  productosFiltrados = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    if (!termino) return this.productos();
    return this.productos().filter((p) => p.nombre.toLowerCase().includes(termino));
  });

  // -------- modal crear/editar --------
  modalAbierto = signal(false);
  modoEdicion = signal(false);
  productoEditandoId = signal<number | null>(null);
  form: ProductoForm = { ...FORM_VACIO };

  get subcategoriasDisponibles(): Subcategoria[] {
    return this.subcategorias().filter(
      (s: Subcategoria) =>
        s.categoriaId === Number(this.form.categoriaId)
    );
  }

  onCategoriaChange() {
    const categoriaId = Number(this.form.categoriaId);

    console.log("Categoria elegida:", categoriaId);

    console.log(
      this.subcategorias()
        .filter(s => s.categoriaId === categoriaId)
    );

    const pertenece = this.subcategorias().some(
      s =>
        s.categoriaId === categoriaId &&
        s.id === Number(this.form.subcategoriaId)
    );

    if (!pertenece) {
      this.form.subcategoriaId = 0;
    }
  }

  abrirNuevo() {
    this.modoEdicion.set(false);
    this.productoEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.inventario.limpiarErrorProducto();
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  abrirEditar(producto: Producto) {
    this.modoEdicion.set(true);
    this.productoEditandoId.set(producto.id);
    const { id, ...resto } = producto;
    this.form = { ...resto };
    this.inventario.limpiarErrorProducto();
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.inventario.limpiarErrorProducto();
    this.errorImagen.set(null);
  }

  guardar() {
    if (!this.form.nombre.trim()) return;

    if (!this.form.subcategoriaId) {
      this.inventario.establecerErrorProducto('Selecciona una categoría y subcategoría antes de guardar.');
      return;
    }

    if (this.modoEdicion() && this.productoEditandoId() !== null) {
      const id = this.productoEditandoId()!;
      this.inventario.actualizarProducto({
        id,
        ...this.form
      });
    } else {
      this.inventario.agregarProducto({ ...this.form });
    }

    this.modalAbierto.set(false);
  }

  // -------- confirmación de eliminación --------
  productoAEliminar = signal<Producto | null>(null);

  abrirEliminar(producto: Producto) {
    this.productoAEliminar.set(producto);
  }

  cerrarEliminar() {
    this.productoAEliminar.set(null);
  }

  confirmarEliminar() {
    const objetivo = this.productoAEliminar();
    if (!objetivo) return;
    this.inventario.eliminarProducto(objetivo.id);
    this.productoAEliminar.set(null);
  }

  // -------- utilidades para la vista --------
  nombreCategoria(id: number): string {
    return this.categorias().find(
      (c: Categoria) => c.id === id
    )?.nombre ?? "—";
  }

  nombreSubcategoria(id: number): string {
    return this.subcategorias().find(
      (s: Subcategoria) => s.id === id
    )?.nombre ?? "—";
  }

  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join('');
  }
}