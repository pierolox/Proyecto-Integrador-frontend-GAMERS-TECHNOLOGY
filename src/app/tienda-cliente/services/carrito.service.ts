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
        if (existente.cantidad >= producto.stock) return lista;
        return lista.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...lista, { producto, cantidad: 1 }];
    });
  }

  // Igual que agregarProducto, pero permite fijar la cantidad inicial de una vez
  // (usado desde la página de detalle, donde el cliente elige cuántas unidades quiere).
  agregarProductoConCantidad(producto: Producto, cantidad: number) {
    this.items.update((lista) => {
      const existente = lista.find((item) => item.producto.id === producto.id);
      if (existente) {
        const nuevaCantidad = Math.min(existente.cantidad + cantidad, producto.stock);
        return lista.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item,
        );
      }
      return [...lista, { producto, cantidad: Math.min(cantidad, producto.stock) }];
    });
  }

  quitarProducto(productoId: number) {
    this.items.update((lista) => lista.filter((item) => item.producto.id !== productoId));
  }

  // El stock del producto es el tope máximo que se puede pedir; nunca baja de 1
  // (para llegar a 0 se usa "Quitar", no seguir bajando el contador).
  aumentarCantidad(productoId: number) {
    this.items.update((lista) =>
      lista.map((item) =>
        item.producto.id === productoId && item.cantidad < item.producto.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      ),
    );
  }

  disminuirCantidad(productoId: number) {
    this.items.update((lista) =>
      lista.map((item) =>
        item.producto.id === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item,
      ),
    );
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
