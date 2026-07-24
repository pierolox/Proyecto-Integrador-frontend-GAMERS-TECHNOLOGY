import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS_MOCK, SUBCATEGORIAS_MOCK, Estado } from '../data/mock-data';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: number;
  subcategoriaId: number;
  imagen: string;
  estado: Estado;
}

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
};

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  // Las categorías y subcategorías cargadas aquí son datos de prueba locales.
  // Este componente todavía no está obteniendo estas listas desde el backend.
  categorias = CATEGORIAS_MOCK;
  subcategorias = SUBCATEGORIAS_MOCK;

  // Datos de productos de relleno del frontend. Estos productos no reflejan
  // la información real almacenada en la base de datos.
  productos = signal<Producto[]>([
    {
      id: 1,
      nombre: 'AMD Ryzen 7 7800X3D',
      descripcion: 'Procesador gamer de 8 núcleos con tecnología 3D V-Cache.',
      precio: 1899,
      stock: 12,
      categoriaId: 1,
      subcategoriaId: 2,
      imagen: '',
      estado: 'Activo',
    },
    {
      id: 2,
      nombre: 'Intel Core Ultra 9 285K',
      descripcion: 'Procesador de última generación para alto rendimiento.',
      precio: 2199,
      stock: 6,
      categoriaId: 1,
      subcategoriaId: 4,
      imagen: '',
      estado: 'Activo',
    },
    {
      id: 3,
      nombre: 'NVIDIA GeForce RTX 4070',
      descripcion: 'Tarjeta gráfica ideal para gaming en 1440p.',
      precio: 3299,
      stock: 8,
      categoriaId: 2,
      subcategoriaId: 6,
      imagen: '',
      estado: 'Activo',
    },
    {
      id: 4,
      nombre: 'AMD Radeon RX 7800 XT',
      descripcion: 'GPU de alto rendimiento con 16GB de memoria.',
      precio: 2899,
      stock: 5,
      categoriaId: 2,
      subcategoriaId: 8,
      imagen: '',
      estado: 'Activo',
    },
    {
      id: 5,
      nombre: 'Kingston Fury Beast 16GB DDR5',
      descripcion: 'Kit de memoria RAM DDR5 a 6000MHz.',
      precio: 349,
      stock: 20,
      categoriaId: 3,
      subcategoriaId: 10,
      imagen: '',
      estado: 'Activo',
    },
    {
      id: 6,
      nombre: 'Corsair Vengeance 8GB DDR4',
      descripcion: 'Memoria RAM DDR4 confiable para uso diario.',
      precio: 159,
      stock: 0,
      categoriaId: 3,
      subcategoriaId: 9,
      imagen: '',
      estado: 'Inactivo',
    },
  ]);

  private siguienteId = 7;

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

  subcategoriasDisponibles = computed(() => {
    return this.subcategorias.filter((s) => s.categoriaId === Number(this.form.categoriaId));
  });

  onCategoriaChange() {
    // al cambiar la categoría, se limpia la subcategoría si ya no pertenece
    const pertenece = this.subcategorias.some(
      (s) => s.categoriaId === Number(this.form.categoriaId) && s.id === Number(this.form.subcategoriaId)
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
      this.productos.update((lista) =>
        lista.map((p) => (p.id === id ? { id, ...this.form } : p))
      );
    } else {
      const nuevo: Producto = { id: this.siguienteId++, ...this.form };
      this.productos.update((lista) => [nuevo, ...lista]);
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
    this.productos.update((lista) => lista.filter((p) => p.id !== objetivo.id));
    this.productoAEliminar.set(null);
  }

  // -------- utilidades para la vista --------
  nombreCategoria(id: number): string {
    return this.categorias.find((c) => c.id === id)?.nombre ?? '—';
  }

  nombreSubcategoria(id: number): string {
    return this.subcategorias.find((s) => s.id === id)?.nombre ?? '—';
  }

  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join('');
  }
}
