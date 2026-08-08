import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  readonly showPago = signal(false);
  readonly enviando = signal(false);
  readonly errorPedido = signal<string | null>(null);
  readonly pedidoConfirmado = signal<{ numero: string; total: number } | null>(null);

  metodoSeleccionado: 'tarjeta' | 'yape' | 'contraentrega' | null = null;

  datosContacto = {
    correo: '',
    telefono: '',
    direccion: '',
  };

  constructor(
    public carrito: CarritoService,
    private authService: AuthService,
    private router: Router,
  ) {}

  get productos() {
    return this.carrito.itemsSignal()();
  }

  get total(): number {
    return this.productos.reduce(
      (sum, item) => sum + item.producto.precio * item.cantidad,
      0,
    );
  }

  quitarProducto(productoId: number) {
    this.carrito.quitarProducto(productoId);
  }

  aumentarCantidad(productoId: number) {
    this.carrito.aumentarCantidad(productoId);
  }

  disminuirCantidad(productoId: number) {
    this.carrito.disminuirCantidad(productoId);
  }

  abrirMetodoPago() {
    // Un pedido siempre pertenece a un usuario (id_usuario NOT NULL en la BD),
    // así que si no hay sesión activa mandamos a loguearse/registrarse primero.
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.metodoSeleccionado = null;
    this.errorPedido.set(null);
    this.pedidoConfirmado.set(null);
    this.showPago.set(true);
  }

  cerrarMetodoPago() {
    this.showPago.set(false);
    this.errorPedido.set(null);
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'yape' | 'contraentrega') {
    this.metodoSeleccionado = metodo;
  }

  confirmarCompra() {
    if (!this.datosContacto.correo.trim() || !this.datosContacto.telefono.trim() || !this.datosContacto.direccion.trim()) {
      this.errorPedido.set('Completa correo, teléfono y dirección para continuar.');
      return;
    }

    this.errorPedido.set(null);
    this.enviando.set(true);

    this.carrito.confirmarPedido(this.datosContacto).subscribe({
      next: (pedido) => {
        this.enviando.set(false);
        this.showPago.set(false);
        this.pedidoConfirmado.set({ numero: pedido.numero, total: pedido.total });
      },
      error: (err) => {
        this.enviando.set(false);
        console.error('No se pudo confirmar el pedido', err);
        this.errorPedido.set(
          err?.error?.mensaje ?? 'No se pudo procesar tu pedido. Intenta de nuevo.',
        );
      },
    });
  }

  cerrarConfirmacion() {
    this.pedidoConfirmado.set(null);
  }
}
