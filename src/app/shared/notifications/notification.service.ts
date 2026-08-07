import { Injectable, signal } from '@angular/core';

export interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'error' | 'info';
}

// Servicio simple de notificaciones "toast", usado por el interceptor de
// errores HTTP para avisar al usuario en vez de fallar en silencio.
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private contador = 0;
  private notificaciones = signal<Notificacion[]>([]);

  notificacionesSignal() {
    return this.notificaciones;
  }

  mostrarError(mensaje: string) {
    this.agregar(mensaje, 'error');
  }

  mostrarInfo(mensaje: string) {
    this.agregar(mensaje, 'info');
  }

  cerrar(id: number) {
    this.notificaciones.update((lista) => lista.filter((n) => n.id !== id));
  }

  private agregar(mensaje: string, tipo: Notificacion['tipo']) {
    const id = ++this.contador;
    this.notificaciones.update((lista) => [...lista, { id, mensaje, tipo }]);
    setTimeout(() => this.cerrar(id), 5000);
  }
}
