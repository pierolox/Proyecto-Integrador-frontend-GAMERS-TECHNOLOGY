import { Component } from '@angular/core';
import { PRODUCTOS } from '../data/mock-data';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  productos = PRODUCTOS;
}
