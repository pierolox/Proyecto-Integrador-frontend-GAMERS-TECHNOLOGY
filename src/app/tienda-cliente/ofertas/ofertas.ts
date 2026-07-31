import { Component } from '@angular/core';
import { PRODUCTOS } from '../data/mock-data';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas {
  productos = PRODUCTOS.filter((producto) => producto.precioAnterior);
}
