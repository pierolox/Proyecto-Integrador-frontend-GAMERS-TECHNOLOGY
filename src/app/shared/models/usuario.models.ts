export interface Usuario {
  id: number;
  usuario: string;
  correo: string;
  fechaRegistro: string; // ISO
  rol: 'ADMIN' | 'USUARIO';
}
