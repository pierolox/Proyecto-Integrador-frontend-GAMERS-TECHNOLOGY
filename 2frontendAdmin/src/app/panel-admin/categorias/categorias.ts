import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS_MOCK, SUBCATEGORIAS_MOCK, Categoria } from '../data/mock-data';

type CategoriaForm = Omit<Categoria, 'id'>;

const FORM_VACIO: CategoriaForm = {
  nombre: '',
  descripcion: '',
  estado: 'Activo',
};

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})

export class Categorias {
  // Datos de categorías y subcategorías de relleno del frontend. Estos valores
  // no provienen de la base de datos ni de ninguna API del backend.
  categorias = signal<Categoria[]>([...CATEGORIAS_MOCK]);
  private subcategorias = SUBCATEGORIAS_MOCK;

  private siguienteId = 5;

  busqueda = signal('');

  categoriasFiltradas = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    if (!termino) return this.categorias();
    return this.categorias().filter((c) => c.nombre.toLowerCase().includes(termino));
  });

  contarSubcategorias(categoriaId: number): number {
    return this.subcategorias.filter((s) => s.categoriaId === categoriaId).length;
  }

  // -------- modal crear/editar --------
  modalAbierto = signal(false);
  modoEdicion = signal(false);
  categoriaEditandoId = signal<number | null>(null);
  form: CategoriaForm = { ...FORM_VACIO };

  abrirNuevo() {
    this.modoEdicion.set(false);
    this.categoriaEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.modalAbierto.set(true);
  }

  abrirEditar(categoria: Categoria) {
    this.modoEdicion.set(true);
    this.categoriaEditandoId.set(categoria.id);
    const { id, ...resto } = categoria;
    this.form = { ...resto };
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardar() {
    if (!this.form.nombre.trim()) return;

    if (this.modoEdicion() && this.categoriaEditandoId() !== null) {
      const id = this.categoriaEditandoId()!;
      this.categorias.update((lista) =>
        lista.map((c) => (c.id === id ? { id, ...this.form } : c))
      );
    } else {
      const nueva: Categoria = { id: this.siguienteId++, ...this.form };
      this.categorias.update((lista) => [nueva, ...lista]);
    }

    this.modalAbierto.set(false);
  }

  // -------- confirmación de eliminación --------
  categoriaAEliminar = signal<Categoria | null>(null);

  abrirEliminar(categoria: Categoria) {
    this.categoriaAEliminar.set(categoria);
  }

  cerrarEliminar() {
    this.categoriaAEliminar.set(null);
  }

  confirmarEliminar() {
    const objetivo = this.categoriaAEliminar();
    if (!objetivo) return;
    this.categorias.update((lista) => lista.filter((c) => c.id !== objetivo.id));
    this.categoriaAEliminar.set(null);
  }
}