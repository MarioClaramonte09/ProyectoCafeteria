import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarritoService } from '../../carrito.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './pago.component.html'
})
export class PagoComponent {
  metodoPago = 'tarjeta';
  mensaje = '';

  envio = {
    nombre: '', apellidos: '', email: '', telefono: '', direccion: '', ciudad: '', codigoPostal: ''
  };

  pago = {
    titular: '', numeroTarjeta: '', caducidad: '', cvv: '', bizumTelefono: '', paypalEmail: ''
  };

  constructor(private carritoService: CarritoService) {}

  get carrito() { return this.carritoService.getCarrito(); }
  get total() { return this.carritoService.getTotal(); }

  confirmarPago(): void {
    this.mensaje = 'Pedido confirmado correctamente. Recibirás un correo con los datos de compra y envío.';
  }
}
