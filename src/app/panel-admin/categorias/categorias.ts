import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Categoria, Subcategoria } from "../../shared/models/inventario.models";
import { InventarioService } from "../../tienda-cliente/services/inventario.service";

type CategoriaForm = Omit<Categoria, "id">;

const FORM_VACIO: CategoriaForm = {
  nombre: "",
  descripcion: "",
  imagen: "",
  colorInicio: "#6366f1",
  colorFin: "#4338ca",
};

@Component({
  selector: "app-categorias",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./categorias.html",
  styleUrl: "./categorias.css",
})

export class Categorias {

  constructor(private inventario: InventarioService) {
    this.categorias = this.inventario.categoriasSignal();
    this.subcategorias = this.inventario.subcategoriasSignal();
  }

  categorias!: ReturnType<InventarioService["categoriasSignal"]>;
  subcategorias!: ReturnType<InventarioService["subcategoriasSignal"]>;
  busqueda = signal("");

  categoriasFiltradas = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();

    if (!texto) return this.categorias();

    return this.categorias().filter((c) =>
      c.nombre.toLowerCase().includes(texto),
    );
  });

  modoEdicion = signal(false);
  modalAbierto = signal(false);
  categoriaEditandoId = signal<number | null>(null);
  form: CategoriaForm = { ...FORM_VACIO };

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

    this.inventario.subirImagenCategoria(archivo).subscribe({
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

  abrirNuevo() {
    this.modoEdicion.set(false);
    this.categoriaEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  abrirEditar(categoria: Categoria) {
    this.modoEdicion.set(true);
    this.categoriaEditandoId.set(categoria.id);

    const { id, ...resto } = categoria;

    this.form = { ...resto };
    this.errorImagen.set(null);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.errorImagen.set(null);
  }

  guardar() {
    if (!this.form.nombre.trim()) return;

    const id = this.categoriaEditandoId();

    if (id) {
      this.inventario.actualizarCategoria({
        id,
        ...this.form,
      });
    } else {
      this.inventario.agregarCategoria({
        ...this.form,
      });
    }

    this.cerrarModal();
  }

  eliminar(id: number) {
    this.inventario.eliminarCategoria(id);
  }

  contarSubcategorias(categoriaId: number) {
    return this.subcategorias()
      .filter(s => s.categoriaId === categoriaId)
      .length;
  }
}
