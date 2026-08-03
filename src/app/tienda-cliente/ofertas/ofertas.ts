import { Component } from '@angular/core';
import { Producto } from '../models/tienda.models';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})

export class Ofertas {

  productos: Producto[] = [];

  constructor(
    private inventario: InventarioService
  ) {
    this.productos = this.inventario
      .obtenerProductos()
      .filter(p => p.precioAnterior);
  }

  obtenerNombreSubcategoria(id: number): string {

    return this.inventario
      .obtenerSubcategorias()
      .find(s => s.id === id)?.nombre ?? '';
  }
}