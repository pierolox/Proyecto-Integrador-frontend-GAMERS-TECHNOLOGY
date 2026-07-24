import { Component, signal } from '@angular/core';

type EstadoPedido = 'Pendiente' | 'En proceso' | 'Enviado' | 'Entregado' | 'Cancelado';

interface ProductoPedido {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

interface Pedido {
  id: number;
  numero: string;
  cliente: string;
  fecha: string;
  productos: ProductoPedido[];
  estado: EstadoPedido;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {
  // Pedidos simulados de ejemplo para que la tabla no quede vacía.
  // Estos datos no vienen del backend y deben reemplazarse por órdenes reales.
  pedidos: Pedido[] = [
    {
      id: 1,
      numero: 'PED-00124',
      cliente: 'Carlos Ramírez',
      fecha: '18/07/2026',
      estado: 'Entregado',
      productos: [
        { nombre: 'AMD Ryzen 7 7800X3D', cantidad: 1, precioUnitario: 1899 },
        { nombre: 'Kingston Fury Beast 16GB DDR5', cantidad: 2, precioUnitario: 349 },
      ],
    },
    {
      id: 2,
      numero: 'PED-00125',
      cliente: 'María Fernández',
      fecha: '19/07/2026',
      estado: 'En proceso',
      productos: [{ nombre: 'NVIDIA GeForce RTX 4070', cantidad: 1, precioUnitario: 3299 }],
    },
    {
      id: 3,
      numero: 'PED-00126',
      cliente: 'Jorge Salazar',
      fecha: '20/07/2026',
      estado: 'Pendiente',
      productos: [
        { nombre: 'AMD Radeon RX 7800 XT', cantidad: 1, precioUnitario: 2899 },
        { nombre: 'Corsair Vengeance 8GB DDR4', cantidad: 2, precioUnitario: 159 },
      ],
    },
    {
      id: 4,
      numero: 'PED-00127',
      cliente: 'Lucía Torres',
      fecha: '21/07/2026',
      estado: 'Enviado',
      productos: [{ nombre: 'Intel Core Ultra 9 285K', cantidad: 1, precioUnitario: 2199 }],
    },
    {
      id: 5,
      numero: 'PED-00128',
      cliente: 'Renato Quispe',
      fecha: '21/07/2026',
      estado: 'Cancelado',
      productos: [{ nombre: 'Kingston Fury Beast 16GB DDR5', cantidad: 1, precioUnitario: 349 }],
    },
  ];

  pedidoSeleccionado = signal<Pedido | null>(null);

  ver(pedido: Pedido) {
    this.pedidoSeleccionado.set(pedido);
  }

  cerrar() {
    this.pedidoSeleccionado.set(null);
  }

  totalPedido(pedido: Pedido): number {
    return pedido.productos.reduce((acc, p) => acc + p.cantidad * p.precioUnitario, 0);
  }
}
