import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  isRegistering = false

  showRegister() {
    this.isRegistering = true
  }

  cancelRegister(){
    this.isRegistering = false
  }
}
