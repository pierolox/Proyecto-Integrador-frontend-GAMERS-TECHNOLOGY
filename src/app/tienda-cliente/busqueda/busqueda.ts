import { Component } from '@angular/core';
import {
  PRODUCTOS,
  SUBCATEGORIAS,
  Subcategoria
} from '../data/mock-data';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})

export class Busqueda {
  productos = PRODUCTOS;
  subcategorias: Subcategoria[] = SUBCATEGORIAS;

  obtenerNombreSubcategoria(id: number): string {
    return this.subcategorias.find(
      s => s.id === id
    )?.nombre ?? '';
  }
}