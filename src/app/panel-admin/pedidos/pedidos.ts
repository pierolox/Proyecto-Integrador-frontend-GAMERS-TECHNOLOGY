import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../tienda-cliente/services/pedido.service';
import { Pedido } from '../../shared/models/pedido.models';

const ESTADOS: Pedido['estado'][] = [
  'Pendiente',
  'En proceso',
  'Enviado',
  'Entregado',
  'Cancelado',
];

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [FormsModule],
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

  estados = ESTADOS;

  pedidoSeleccionado = signal<Pedido | null>(null);
  cambiandoEstado = signal(false);
  errorCambioEstado = signal<string | null>(null);

  // -------- filtros --------
  filtroFecha = signal<string>(''); // yyyy-MM-dd
  filtroEstado = signal<string>('');

  pedidosFiltrados = computed(() => {
    const fecha = this.filtroFecha();
    const estado = this.filtroEstado();

    return this.pedidos().filter((p) => {
      const coincideFecha = !fecha || p.fecha.slice(0, 10) === fecha;
      const coincideEstado = !estado || p.estado === estado;
      return coincideFecha && coincideEstado;
    });
  });

  limpiarFiltros() {
    this.filtroFecha.set('');
    this.filtroEstado.set('');
  }

  ngOnInit() {
    this.pedidoService.cargarTodos();
  }

  ver(pedido: Pedido) {
    this.errorCambioEstado.set(null);
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

  esCancelado(estado: string): boolean {
    return estado === 'Cancelado';
  }

  formatearFecha(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-PE');
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: string) {
    if (nuevoEstado === pedido.estado) return;

    this.cambiandoEstado.set(true);
    this.errorCambioEstado.set(null);

    this.pedidoService.actualizarEstado(pedido.id, nuevoEstado as Pedido['estado']).subscribe({
      next: (actualizado) => {
        this.pedidoSeleccionado.set(actualizado);
        this.cambiandoEstado.set(false);
      },
      error: (err) => {
        console.error('No se pudo actualizar el estado', err);
        this.errorCambioEstado.set(
          err?.error?.mensaje ?? 'No se pudo actualizar el estado del pedido.',
        );
        this.cambiandoEstado.set(false);
      },
    });
  }
}
