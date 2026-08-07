import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NuevoPedido, Pedido } from '../../shared/models/pedido.models';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pedidosUrl = `${environment.apiUrl}/pedidos`;

  private pedidos = signal<Pedido[]>([]);
  private cargando = signal(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  pedidosSignal() {
    return this.pedidos;
  }

  cargandoSignal() {
    return this.cargando;
  }

  errorSignal() {
    return this.error;
  }

  limpiarError() {
    this.error.set(null);
  }

  // Crea el pedido a partir del carrito. Usado por CarritoService.confirmarPedido().
  crear(datos: NuevoPedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.pedidosUrl, datos);
  }

  // Todos los pedidos, para panel-admin/pedidos.
  cargarTodos() {
    this.cargando.set(true);
    this.error.set(null);
    this.http.get<Pedido[]>(this.pedidosUrl).subscribe({
      next: (lista) => {
        this.pedidos.set(lista);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('No se pudieron cargar los pedidos', err);
        this.error.set(this.extraerMensajeError(err));
        this.cargando.set(false);
      },
    });
  }

  private extraerMensajeError(err: any): string {
    const cuerpo = err?.error;
    if (cuerpo?.mensaje) return cuerpo.mensaje;
    if (err?.status === 401 || err?.status === 403) {
      return 'No tienes permisos para ver los pedidos. Inicia sesión como administrador.';
    }
    if (err?.status === 0) {
      return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';
    }
    return 'Ocurrió un error inesperado al cargar los pedidos.';
  }
}
