import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

interface Cupon {
  codigo: string;
  descuento: string;
  titulo: string;
  descripcion: string;
  validoHasta: string;
  delay: number;
}

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './cupones.component.html'
})
export class CuponesComponent implements OnInit, AfterViewInit {
  private readonly STORAGE_KEY = 'cafeteria_cupones_usados';

  cupones: Cupon[] = [
    { codigo: 'CAFE20', descuento: '20%', titulo: '☕ Café de Especialidad', descripcion: 'Descuento en cualquier café de origen único o mezcla especial', validoHasta: '31 de Marzo 2026', delay: 0 },
    { codigo: 'DESAYU3X2', descuento: '3X2', titulo: '🥐 Desayunos Especiales', descripcion: 'Compra 2 productos de repostería y el tercero es gratis', validoHasta: '30 de Abril 2026', delay: 100 },
    { codigo: 'WORK15', descuento: '15%', titulo: '💻 Espacio de Trabajo', descripcion: '15% en alquileres de mesas y acceso a salas privadas', validoHasta: '31 de Mayo 2026', delay: 200 },
    { codigo: 'GAMING25', descuento: '25%', titulo: '🎮 Pack Gaming', descripcion: '25% en alquiler de ordenadores gaming + bebida gratis', validoHasta: '28 de Febrero 2026', delay: 300 },
    { codigo: 'GRUPOS30', descuento: '30%', titulo: '👥 Grupos y Eventos', descripcion: '30% descuento en reservas para grupos de 8+ personas', validoHasta: '30 de Junio 2026', delay: 400 },
    { codigo: 'VIP10', descuento: '10%', titulo: '⭐ Cliente Premium', descripcion: '10% en toda la carta para miembros del club de fidelización', validoHasta: '31 de Diciembre 2026', delay: 500 }
  ];

  cuponesUsados: string[] = [];
  mensajeCupon = '';

  ngOnInit(): void {
    this.cargarCuponesUsados();
  }

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
  }

  usarCupon(cupon: Cupon): void {
    if (this.estaUsado(cupon.codigo)) {
      this.mensajeCupon = `El cupón ${cupon.codigo} ya ha sido utilizado por este usuario.`;
      return;
    }

    this.cuponesUsados.push(cupon.codigo);
    this.guardarCuponesUsados();
    this.mensajeCupon = `¡Cupón ${cupon.codigo} utilizado correctamente! Ya no estará disponible para este usuario.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(cupon.codigo).catch(() => {});
    }
  }

  estaUsado(codigo: string): boolean {
    return this.cuponesUsados.includes(codigo);
  }

  private cargarCuponesUsados(): void {
    const datosGuardados = localStorage.getItem(this.STORAGE_KEY);
    this.cuponesUsados = datosGuardados ? JSON.parse(datosGuardados) : [];
  }

  private guardarCuponesUsados(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cuponesUsados));
  }
}
