import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../../shared/models/inventario.models';

interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items = signal<CartItem[]>([]);

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
}
