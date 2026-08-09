import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subcategoria, Categoria } from "../../shared/models/inventario.models";
import { InventarioService } from "../../tienda-cliente/services/inventario.service";

type SubcategoriaForm = Omit<Subcategoria, "id">;

const FORM_VACIO: SubcategoriaForm = {
  categoriaId: 0,
  nombre: "",
  descripcion: "",
  imagen: "",
};

@Component({
  selector: "app-subcategorias",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./subcategorias.html",
  styleUrl: "./subcategorias.css",
})
export class Subcategorias {
  categorias!: ReturnType<InventarioService["categoriasSignal"]>;

  subcategorias!: ReturnType<InventarioService["subcategoriasSignal"]>;

  constructor(private inventario: InventarioService) {
    this.subcategorias = this.inventario.subcategoriasSignal();
    this.categorias = this.inventario.categoriasSignal();
  }

  busqueda = signal("");
  filtroCategoriaId = signal<number>(0);

  subcategoriasFiltradas = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    const catId = this.filtroCategoriaId();

    return this.subcategorias().filter((s) => {
      const coincideTermino =
        !termino || s.nombre.toLowerCase().includes(termino);
      const coincideCategoria = !catId || s.categoriaId === catId;
      return coincideTermino && coincideCategoria;
    });
  });

  nombreCategoria(categoriaId: number): string {
    return this.categorias().find((c) => c.id === categoriaId)?.nombre ?? "—";
  }

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

    this.inventario.subirImagenSubcategoria(archivo).subscribe({
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

  // -------- modal crear/editar --------
  modalAbierto = signal(false);
  modoEdicion = signal(false);
  subcategoriaEditandoId = signal<number | null>(null);
  form: SubcategoriaForm = { ...FORM_VACIO };

  abrirNuevo() {
    this.modoEdicion.set(false);
    this.subcategoriaEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  abrirEditar(subcategoria: Subcategoria) {
    this.modoEdicion.set(true);
    this.subcategoriaEditandoId.set(subcategoria.id);
    const { id, ...resto } = subcategoria;
    this.form = { ...resto };
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.errorImagen.set(null);
  }

  guardar() {
    if (!this.form.nombre.trim() || !this.form.categoriaId) return;

    if (this.modoEdicion() && this.subcategoriaEditandoId() !== null) {
      const id = this.subcategoriaEditandoId()!;
      this.inventario.actualizarSubcategoria({ id, ...this.form });
    } else {
      this.inventario.agregarSubcategoria({ ...this.form });
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

    this.inventario.eliminarSubcategoria(objetivo.id);

    this.subcategoriaAEliminar.set(null);
  }
}
