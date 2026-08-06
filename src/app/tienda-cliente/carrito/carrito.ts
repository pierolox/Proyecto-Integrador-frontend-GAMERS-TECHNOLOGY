import { Component, signal } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  readonly showPago = signal(false);
  metodoSeleccionado: 'tarjeta' | 'yape' | 'contraentrega' | null = null;

  constructor(public carrito: CarritoService) {}

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

  abrirMetodoPago() {
    this.metodoSeleccionado = null;
    this.showPago.set(true);
  }

  cerrarMetodoPago() {
    this.showPago.set(false);
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'yape' | 'contraentrega') {
    this.metodoSeleccionado = metodo;
  }

  confirmarCompra() {
    const total = this.total;
    this.carrito.vaciarCarrito();
    this.showPago.set(false);
    window.alert('Pago procesado: ' + (this.metodoSeleccionado ?? 'método seleccionado') + '\nTotal: S/ ' + total.toFixed(2));
  }
}
