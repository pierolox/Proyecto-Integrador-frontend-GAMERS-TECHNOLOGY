import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

export type UserRole = 'ADMIN' | 'USUARIO';

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  token?: string;
  usuario?: string;
  rol?: UserRole;
}

interface SesionGuardada {
  token: string;
  usuario: string;
  rol: UserRole;
}

const STORAGE_KEY = 'gt_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // Estado de sesión reactivo, disponible en toda la app (guards, header, etc.)
  private sesion = signal<SesionGuardada | null>(this.leerSesionGuardada());

  isAuthenticated = computed(() => this.sesion() !== null);
  usuarioActual = computed(() => this.sesion()?.usuario ?? null);
  rolActual = computed(() => this.sesion()?.rol ?? null);
  esAdmin = computed(() => this.sesion()?.rol === 'ADMIN');

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { usuario, contrasena })
      .pipe(tap((res) => this.manejarRespuestaAuth(res)));
  }

  register(usuario: string, correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register`, { usuario, correo, contrasena })
      .pipe(tap((res) => this.manejarRespuestaAuth(res)));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.sesion.set(null);
  }

  getToken(): string | null {
    return this.sesion()?.token ?? null;
  }

  private manejarRespuestaAuth(res: LoginResponse): void {
    if (res.success && res.token && res.usuario && res.rol) {
      const sesion: SesionGuardada = {
        token: res.token,
        usuario: res.usuario,
        rol: res.rol,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
      this.sesion.set(sesion);
    }
  }

  private leerSesionGuardada(): SesionGuardada | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SesionGuardada;
    } catch {
      return null;
    }
  }
}