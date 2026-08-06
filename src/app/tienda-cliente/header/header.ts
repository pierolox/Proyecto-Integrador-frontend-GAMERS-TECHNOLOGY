import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuAbierto = signal(false);
  userName = signal<string | null>(null);

  constructor(private router: Router, private carrito: CarritoService) {}

  get cantidadCarrito(): number {
    return this.carrito.cantidadProductos();
  }

  get isLoggedIn(): boolean {
    return this.userName() !== null;
  }

  ngOnInit() {
    this.loadUser();
    window.addEventListener('usuario-cambiado', () => this.loadUser());
  }

  loadUser() {
    try {
      const raw = localStorage.getItem('usuario');
      if (raw) {
        const u = JSON.parse(raw);
        this.userName.set(u.nombre ?? u.usuario ?? null);
      } else {
        this.userName.set(null);
      }
    } catch (e) {
      this.userName.set(null);
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    window.dispatchEvent(new CustomEvent('usuario-cambiado'));
    this.userName.set(null);
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuAbierto.update((v) => !v);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }
}
