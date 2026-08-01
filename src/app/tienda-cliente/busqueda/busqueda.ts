import { Component } from '@angular/core';
import { Producto } from '../data/mock-data';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {

  productos: Producto[] = [];

  constructor(
    private inventario: InventarioService
  ) {
    this.productos = this.inventario.obtenerProductos();
  }

  obtenerNombreSubcategoria(id: number): string {

    return this.inventario
      .obtenerSubcategorias()
      .find(s => s.id === id)?.nombre ?? '';
  }
}