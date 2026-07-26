import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

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

  constructor(private router: Router) {}

  iniciarSesion(form: NgForm) {
    if (form.invalid) {
      this.errorMessage.set('Completa tu usuario y contraseña para continuar.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    // Simula una validación contra el backend
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/panel-admin']);
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
      this.isSubmitting.set(false);
      this.isRegistering.set(false);
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
