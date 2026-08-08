import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuAbierto = signal(false);
  menuUsuarioAbierto = signal(false);

  constructor(
    private router: Router,
    private carrito: CarritoService,
    public authService: AuthService,
    private elementRef: ElementRef,
  ) {}

  @HostListener('document:click', ['$event'])
  onClickFuera(event: MouseEvent) {
    if (this.menuUsuarioAbierto() && !this.elementRef.nativeElement.contains(event.target)) {
      this.menuUsuarioAbierto.set(false);
    }
  }

  get cantidadCarrito(): number {
    return this.carrito.cantidadProductos();
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get nombreUsuario(): string | null {
    return this.authService.usuarioActual();
  }

  toggleMenuUsuario() {
    this.menuUsuarioAbierto.update((v) => !v);
  }

  cerrarMenuUsuario() {
    this.menuUsuarioAbierto.set(false);
  }

  logout() {
    this.authService.logout();
    this.cerrarMenuUsuario();
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuAbierto.update((v) => !v);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
    this.menuUsuarioAbierto.set(false);
  }
}