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

    setTimeout(() => {
      const user = this.authService.login(this.loginData.usuario, this.loginData.contrasena);
      this.isSubmitting.set(false);

      if (!user) {
        this.errorMessage.set('Credenciales inválidas. Prueba con admin / 123456 o crea una cuenta de cliente.');
        return;
      }

      if (user.rol === 'admin') {
        this.router.navigate(['/panel-admin']);
        return;
      }

      this.router.navigate(['/']);
    }, 400);
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

    setTimeout(() => {
      const error = this.authService.register(
        this.registerData.usuario,
        this.registerData.correo,
        this.registerData.contrasena,
      );

      this.isSubmitting.set(false);

      if (error) {
        this.errorMessage.set(error);
        return;
      }

      this.errorMessage.set('Cuenta creada. Ahora puedes iniciar sesión con tus credenciales.');
      this.isRegistering.set(false);
      this.loginData.usuario = this.registerData.usuario;
      this.loginData.contrasena = this.registerData.contrasena;
    }, 400);
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
