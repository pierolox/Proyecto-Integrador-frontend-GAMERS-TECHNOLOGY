import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuAbierto = signal(false);
  cantidadCarrito = signal(3);
  userName = signal<string | null>(null);

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
    window.addEventListener('usuario-cambiado', () => this.loadUser());
  }

  loadUser() {
    try {
      const raw = localStorage.getItem('usuario');
      if (raw) {
        const u = JSON.parse(raw);
        this.userName.set(u.nombre ?? null);
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
