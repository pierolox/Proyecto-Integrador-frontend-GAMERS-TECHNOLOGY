import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from './shared/notifications/notification.service';
import { AuthService } from './auth.service';

// Interceptor global de errores HTTP: centraliza el manejo de 400/401/403/404/500
// para que ninguna petición falle en silencio. Deja pasar el error hacia abajo
// (throwError) para que cada componente pueda seguir reaccionando si lo necesita
// (por ejemplo, mostrando el error dentro de un formulario), pero además
// siempre avisa al usuario con un toast.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Las peticiones a /api/auth/** (login/registro) ya muestran su propio
      // mensaje de error en el formulario; no se duplica con un toast.
      const esAuth = req.url.includes('/api/auth/');

      if (!esAuth) {
        notificationService.mostrarError(mensajeParaError(error));
      }

      if (error.status === 401) {
        // El token no existe, expiró o es inválido: se limpia la sesión.
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};

function mensajeParaError(error: HttpErrorResponse): string {
  const cuerpo = error.error;

  if (cuerpo?.mensaje) {
    return cuerpo.mensaje;
  }

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';
    case 400:
      return 'La solicitud tiene datos inválidos.';
    case 401:
      return 'Tu sesión expiró. Inicia sesión nuevamente.';
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'No se encontró el recurso solicitado.';
    case 500:
      return 'Ocurrió un error inesperado en el servidor.';
    default:
      return 'Ocurrió un error inesperado.';
  }
}
