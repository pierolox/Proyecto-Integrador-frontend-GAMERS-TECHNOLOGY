import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  iniciarSesion(form: NgForm) {
    if (form.invalid) {
      this.errorMessage.set('Completa tu usuario y contraseña para continuar.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.authService.login(this.loginData.usuario, this.loginData.contrasena).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);

        if (!res.success) {
          this.errorMessage.set(res.mensaje);
          return;
        }

        if (res.rol === 'ADMIN') {
          this.router.navigate(['/panel-admin']);
          return;
        }

        this.router.navigate(['/']);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('No se pudo conectar con el servidor. Intenta nuevamente.');
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

    this.authService
      .register(this.registerData.usuario, this.registerData.correo, this.registerData.contrasena)
      .subscribe({
        next: (res) => {
          this.isSubmitting.set(false);

          if (!res.success) {
            this.errorMessage.set(res.mensaje);
            return;
          }

          this.errorMessage.set('Cuenta creada. Ahora puedes iniciar sesión con tus credenciales.');
          this.isRegistering.set(false);
          this.loginData.usuario = this.registerData.usuario;
          this.loginData.contrasena = this.registerData.contrasena;
        },
        error: () => {
          this.isSubmitting.set(false);
          this.errorMessage.set('No se pudo conectar con el servidor. Intenta nuevamente.');
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