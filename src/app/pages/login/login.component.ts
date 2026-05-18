import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  irRegistro = false;
  mensaje = '';

  iniciarSesion(): void {
    this.mensaje = `Sesión iniciada correctamente para ${this.email || 'usuario demo'}.`;
  }
}
