import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  aceptar = false;
  irLogin = false;
  mensaje = '';

  registrarse(): void {
    this.mensaje = `Usuario ${this.nombre || 'demo'} registrado correctamente.`;
  }
}
