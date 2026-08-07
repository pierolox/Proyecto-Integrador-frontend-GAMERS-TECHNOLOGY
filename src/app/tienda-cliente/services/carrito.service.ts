import { Injectable, computed, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Producto } from '../../shared/models/inventario.models';
import { NuevoPedido, Pedido } from '../../shared/models/pedido.models';
import { PedidoService } from './pedido.service';

interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items = signal<CartItem[]>([]);

  constructor(private pedidoService: PedidoService) {}

  itemsSignal() {
    return this.items;
  }

  cantidadProductos = computed(() =>
    this.items().reduce((sum, item) => sum + item.cantidad, 0),
  );

  agregarProducto(producto: Producto) {
    this.items.update((lista) => {
      const existente = lista.find((item) => item.producto.id === producto.id);
      if (existente) {
        return lista.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...lista, { producto, cantidad: 1 }];
    });
  }

  quitarProducto(productoId: number) {
    this.items.update((lista) => lista.filter((item) => item.producto.id !== productoId));
  }

  vaciarCarrito() {
    this.items.set([]);
  }

  obtenerSubtotal(productoId: number) {
    const item = this.items().find((item) => item.producto.id === productoId);
    return item ? item.producto.precio * item.cantidad : 0;
  }

  // Crea el pedido en el backend a partir de los productos actuales del carrito.
  // Solo vacía el carrito si el backend confirma que el pedido se creó bien
  // (por ejemplo, si no hay stock suficiente, el carrito se mantiene intacto).
  confirmarPedido(datosContacto: { correo: string; telefono: string; direccion: string }): Observable<Pedido> {
    const nuevoPedido: NuevoPedido = {
      ...datosContacto,
      productos: this.items().map((item) => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
      })),
    };

    return this.pedidoService.crear(nuevoPedido).pipe(tap(() => this.vaciarCarrito()));
  }
}
