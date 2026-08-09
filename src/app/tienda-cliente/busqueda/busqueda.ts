import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  readonly busqueda = signal('');
  readonly productosFiltrados = computed(() =>
    this.inventario.obtenerProductosPorTexto(this.busqueda()),
  );

  constructor(private inventario: InventarioService) {}

  obtenerNombreSubcategoria(id: number): string {
    return this.inventario
      .obtenerSubcategorias()
      .find((s) => s.id === id)?.nombre ?? '';
  }

  resolverUrlImagen(imagen: string | null | undefined): string | null {
    return this.inventario.resolverUrlImagen(imagen);
  }
}