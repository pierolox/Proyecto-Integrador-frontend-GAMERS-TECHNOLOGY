import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-tienda-cliente',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './tienda-cliente.html',
  styleUrl: './tienda-cliente.css',
})
export class TiendaCliente {}
