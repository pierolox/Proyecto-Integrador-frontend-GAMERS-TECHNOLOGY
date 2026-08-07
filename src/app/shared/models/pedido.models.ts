export interface DetallePedido {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  numero: string;
  cliente: string;
  fecha: string; // ISO
  estado: 'Pendiente' | 'En proceso' | 'Enviado' | 'Entregado' | 'Cancelado';
  subtotal: number;
  igv: number;
  total: number;
  correo: string;
  telefono: string;
  direccion: string;
  productos: DetallePedido[];
}

export interface NuevoPedido {
  correo: string;
  telefono: string;
  direccion: string;
  productos: { productoId: number; cantidad: number }[];
}
