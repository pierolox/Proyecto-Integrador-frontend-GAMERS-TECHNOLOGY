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
    this.modalAbierto.set(true);
  }

  abrirEditar(producto: Producto) {
    this.modoEdicion.set(true);
    this.productoEditandoId.set(producto.id);
    const { id, ...resto } = producto;
    this.form = { ...resto };
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardar() {
    if (!this.form.nombre.trim()) return;

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