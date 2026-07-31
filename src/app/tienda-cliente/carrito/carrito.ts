import { Component } from '@angular/core';

interface ProductoCarrito {
  id: number;
  nombre: string;
  detalle: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productos: ProductoCarrito[] = [
    { id: 1, nombre: 'Teclado mecánico RGB', detalle: '1 unidad · S/ 320.00', precio: 320, cantidad: 1 },
    { id: 2, nombre: 'Mouse gamer inalámbrico', detalle: '2 unidades · S/ 180.00', precio: 180, cantidad: 2 },
  ];

  showPago = false;
  metodoSeleccionado: 'tarjeta' | 'yape' | 'contraentrega' | null = null;

  get total(): number {
    return this.productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  quitarProducto(productoId: number) {
    this.productos = this.productos.filter((producto) => producto.id !== productoId);
  }

  abrirMetodoPago() {
    this.metodoSeleccionado = null;
    this.showPago = true;
  }

  cerrarMetodoPago() {
    this.showPago = false;
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'yape' | 'contraentrega') {
    this.metodoSeleccionado = metodo;
  }

  confirmarCompra() {
    // Implementación mínima: vaciar carrito y cerrar modal
    // En una app real, aquí iría la llamada al backend / pasarela de pago
    const total = this.total;
    this.productos = [];
    this.showPago = false;
    window.alert('Pago procesado: ' + (this.metodoSeleccionado ?? 'método seleccionado') + '\nTotal: S/ ' + total.toFixed(2));
  }
}
