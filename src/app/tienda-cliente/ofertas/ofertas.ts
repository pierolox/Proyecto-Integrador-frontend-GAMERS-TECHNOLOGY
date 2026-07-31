import { Component } from '@angular/core';
import { PRODUCTOS, SUBCATEGORIAS, Subcategoria } from '../data/mock-data';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})

export class Ofertas {
  subcategorias: Subcategoria[] = SUBCATEGORIAS;
  productos = PRODUCTOS.filter(
    producto => producto.precioAnterior
  );

  obtenerNombreSubcategoria(id: number): string {
    return this.subcategorias.find(
      s => s.id === id
    )?.nombre ?? '';
  }
}