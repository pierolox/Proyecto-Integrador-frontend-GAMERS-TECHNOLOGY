import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../shared/models/usuario.models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuariosUrl = `${environment.apiUrl}/usuarios`;

  private usuarios = signal<Usuario[]>([]);
  private cargando = signal(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  usuariosSignal() {
    return this.usuarios;
  }

  cargandoSignal() {
    return this.cargando;
  }

  errorSignal() {
    return this.error;
  }

  cargarTodos() {
    this.cargando.set(true);
    this.error.set(null);
    this.http.get<Usuario[]>(this.usuariosUrl).subscribe({
      next: (lista) => {
        this.usuarios.set(lista);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('No se pudieron cargar los usuarios', err);
        this.error.set(this.extraerMensajeError(err));
        this.cargando.set(false);
      },
    });
  }

  eliminar(id: number) {
    this.error.set(null);
    this.http.delete<boolean>(`${this.usuariosUrl}/${id}`).subscribe({
      next: () => this.usuarios.update((lista) => lista.filter((u) => u.id !== id)),
      error: (err) => {
        console.error('No se pudo eliminar el usuario', err);
        this.error.set(this.extraerMensajeError(err));
      },
    });
  }

  private extraerMensajeError(err: any): string {
    const cuerpo = err?.error;
    if (cuerpo?.mensaje) return cuerpo.mensaje;
    if (err?.status === 401 || err?.status === 403) {
      return 'No tienes permisos para gestionar usuarios. Inicia sesión como administrador.';
    }
    if (err?.status === 0) {
      return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';
    }
    return 'Ocurrió un error inesperado.';
  }
}
