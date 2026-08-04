import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Categoria, Subcategoria } from "../../shared/models/inventario.models";
import { InventarioService } from "../../tienda-cliente/services/inventario.service";

type CategoriaForm = Omit<Categoria, "id">;

const FORM_VACIO: CategoriaForm = {
  nombre: "",
  descripcion: "",
  icono: "",
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
    this.subcategorias = this.inventario.obtenerSubcategorias();
  }

  categorias!: ReturnType<InventarioService["categoriasSignal"]>;
  subcategorias: Subcategoria[] = [];
  busqueda = signal("");

  categoriasFiltradas = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();

    if (!texto) return this.categorias();

    return this.categorias().filter((c) =>
      c.nombre.toLowerCase().includes(texto),
    );
  });

  private siguienteId = 6;

  modoEdicion = signal(false);
  modalAbierto = signal(false);
  categoriaEditandoId = signal<number | null>(null);
  form: CategoriaForm = { ...FORM_VACIO };

  abrirNuevo() {
    this.categoriaEditandoId.set(null);
    this.form = { ...FORM_VACIO };
    this.modalAbierto.set(true);
  }

  abrirEditar(categoria: Categoria) {
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

    const id = this.categoriaEditandoId();

    if (id) {
      this.inventario.actualizarCategoria({
        id,
        ...this.form,
      });
    } else {
      this.inventario.agregarCategoria({
        id: this.siguienteId++,
        ...this.form,
      });
    }

    this.cerrarModal();
  }

  eliminar(id: number) {
    this.inventario.eliminarCategoria(id);
  }

  contarSubcategorias(categoriaId: number): number {
    return this.subcategorias.filter((s) => s.categoriaId === categoriaId)
      .length;
  }
}
