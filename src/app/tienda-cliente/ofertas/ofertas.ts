import { Component, effect } from '@angular/core';
import { Producto } from '../../shared/models/inventario.models';
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
    // Los productos llegan de forma asíncrona (HTTP); se sincronizan
    // cada vez que cambian en el servicio.
    effect(() => {
      this.productos = this.inventario
        .productosSignal()()
        .filter(p => p.precioAnterior);
    });
  }

  obtenerNombreSubcategoria(id: number): string {

    return this.inventario
      .obtenerSubcategorias()
      .find(s => s.id === id)?.nombre ?? '';
  }
}