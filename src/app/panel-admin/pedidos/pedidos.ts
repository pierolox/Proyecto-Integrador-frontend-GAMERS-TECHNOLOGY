import { Component, OnInit, signal } from '@angular/core';
import { PedidoService } from '../../tienda-cliente/services/pedido.service';
import { Pedido } from '../../shared/models/pedido.models';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  constructor(private pedidoService: PedidoService) {
    this.pedidos = this.pedidoService.pedidosSignal();
    this.cargando = this.pedidoService.cargandoSignal();
    this.error = this.pedidoService.errorSignal();
  }

  pedidos!: ReturnType<PedidoService['pedidosSignal']>;
  cargando!: ReturnType<PedidoService['cargandoSignal']>;
  error!: ReturnType<PedidoService['errorSignal']>;

  pedidoSeleccionado = signal<Pedido | null>(null);

  ngOnInit() {
    this.pedidoService.cargarTodos();
  }

  ver(pedido: Pedido) {
    this.pedidoSeleccionado.set(pedido);
  }

  cerrar() {
    this.pedidoSeleccionado.set(null);
  }

  totalPedido(pedido: Pedido): number {
    return pedido.total;
  }

  esEntregado(estado: string): boolean {
    return estado === 'Entregado';
  }

  formatearFecha(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-PE');
  }
}
