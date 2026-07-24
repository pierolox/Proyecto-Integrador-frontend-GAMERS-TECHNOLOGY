import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface AuthResponse {
  success: boolean;
  mensaje: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isRegistering = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal('');

  loginData = {
    usuario: '',
    contrasena: '',
  };

  registerData = {
    usuario: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
  };

  constructor(private router: Router, private http: HttpClient) {}

  iniciarSesion(form: NgForm) {
    if (form.invalid) {
      this.errorMessage.set('Completa tu usuario y contraseña para continuar.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.http.post<AuthResponse>('/api/auth/login', this.loginData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          this.router.navigate(['/panel-admin']);
        } else {
          this.errorMessage.set(response.mensaje || 'Credenciales incorrectas.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          error.error?.mensaje || 'Error al conectar con el backend. Verifica la API.'
        );
      },
    });
  }

  crearCuenta(form: NgForm) {
    if (form.invalid) {
      this.errorMessage.set('Revisa los campos del formulario de registro.');
      return;
    }

    if (this.registerData.contrasena !== this.registerData.confirmarContrasena) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.http.post<AuthResponse>('/api/auth/register', {
      usuario: this.registerData.usuario,
      correo: this.registerData.correo,
      contrasena: this.registerData.contrasena,
    }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          this.isRegistering.set(false);
          this.errorMessage.set('Cuenta creada correctamente. Ahora inicia sesión.');
        } else {
          this.errorMessage.set(response.mensaje || 'No se pudo crear la cuenta.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          error.error?.mensaje || 'Error al conectar con el backend. Verifica la API.'
        );
      },
    });
  }

  showRegister() {
    this.errorMessage.set('');
    this.isRegistering.set(true);
  }

  cancelRegister() {
    this.errorMessage.set('');
    this.isRegistering.set(false);
  }
}
