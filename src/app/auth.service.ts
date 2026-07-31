import { Injectable } from '@angular/core';

export type UserRole = 'admin' | 'cliente';

export interface AuthUser {
  usuario: string;
  correo?: string;
  rol: UserRole;
  contrasena: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: AuthUser[] = [
    { usuario: 'admin', contrasena: '123456', rol: 'admin' },
  ];

  login(usuario: string, contrasena: string): AuthUser | null {
    const normalizedUser = usuario.trim().toLowerCase();
    const normalizedPassword = contrasena.trim();

    const storedUser = this.users.find((user) => user.usuario.toLowerCase() === normalizedUser);

    if (!storedUser) {
      return null;
    }

    if (storedUser.contrasena !== normalizedPassword) {
      return null;
    }

    return { ...storedUser };
  }

  register(usuario: string, correo: string, contrasena: string): string | null {
    const normalizedUser = usuario.trim().toLowerCase();

    if (!normalizedUser || !correo.trim() || !contrasena.trim()) {
      return 'Completa todos los campos para crear tu cuenta.';
    }

    if (contrasena.trim().length < 4) {
      return 'La contraseña debe tener al menos 4 caracteres.';
    }

    const exists = this.users.some((user) => user.usuario.toLowerCase() === normalizedUser);
    if (exists) {
      return 'El usuario ya existe.';
    }

    this.users.push({
      usuario: normalizedUser,
      correo: correo.trim(),
      contrasena: contrasena.trim(),
      rol: 'cliente',
    });

    return null;
  }
}
