import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS_MOCK, SUBCATEGORIAS_MOCK, Subcategoria } from '../data/mock-data';

type SubcategoriaForm = Omit<Subcategoria, 'id'>;

const FORM_VACIO: SubcategoriaForm = {
  categoriaId: 0,
  nombre: '',
  descripcion: '',
  estado: 'Activo',
};

@Component({
  selector: 'app-subcategorias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subcategorias.html',
  styleUrl: './subcategorias.css',
})
export class Subcategorias {
  // Datos de subcategorías y categorías de relleno del frontend.
  // No se están consultando desde la base de datos.
  categorias = CATEGORIAS_MOCK;
  subcategorias = signal<Subcategoria[]>([...SUBCATEGORIAS_MOCK]);

  private siguienteId = 12;

  busqueda = signal('');
  filtroCategoriaId = signal<number>(0);

  subcategoriasFiltradas = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    const catId = this.filtroCategoriaId();

    return this.subcategorias().filter((s) => {
      const coincideTermino = !termino || s.nombre.toLowerCase().includes(termino);
      const coincideCategoria = !catId || s.categoriaId === catId;
      return coincideTermino && coincideCategoria;
    });
  });

  nombreCategoria(categoriaId: number): string {
    return this.categorias.find((c) => c.id === categoriaId)?.nombre ?? '—';
  }

  // -------- modal crear/editar --------
  modalAbierto = signal(false);
  modoEdicion = signal(false);
  subcategoriaEditandoId = signal<number | null>(null);
  form: SubcategoriaForm = { ...FORM_VACIO };

  abrirNuevo() {
    this.modoEdicion.set(false);
    this.subcategoriaEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.modalAbierto.set(true);
  }

  abrirEditar(subcategoria: Subcategoria) {
    this.modoEdicion.set(true);
    this.subcategoriaEditandoId.set(subcategoria.id);
    const { id, ...resto } = subcategoria;
    this.form = { ...resto };
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardar() {
    if (!this.form.nombre.trim() || !this.form.categoriaId) return;

    if (this.modoEdicion() && this.subcategoriaEditandoId() !== null) {
      const id = this.subcategoriaEditandoId()!;
      this.subcategorias.update((lista) =>
        lista.map((s) => (s.id === id ? { id, ...this.form } : s))
      );
    } else {
      const nueva: Subcategoria = { id: this.siguienteId++, ...this.form };
      this.subcategorias.update((lista) => [nueva, ...lista]);
    }

    this.modalAbierto.set(false);
  }

  // -------- confirmación de eliminación --------
  subcategoriaAEliminar = signal<Subcategoria | null>(null);

  abrirEliminar(subcategoria: Subcategoria) {
    this.subcategoriaAEliminar.set(subcategoria);
  }

  cerrarEliminar() {
    this.subcategoriaAEliminar.set(null);
  }

  confirmarEliminar() {
    const objetivo = this.subcategoriaAEliminar();
    if (!objetivo) return;
    this.subcategorias.update((lista) => lista.filter((s) => s.id !== objetivo.id));
    this.subcategoriaAEliminar.set(null);
  }
}
