import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

interface Reserva {
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
  servicio: string;
  servicioNombre: string;
  personas: number;
  duracion: number;
  horasBloqueadas: string[];
  creadaEn: string;
}

interface ServicioReserva {
  value: string;
  label: string;
  grupo: string;
}

interface HoraDisponible {
  hora: string;
  disponible: boolean;
  motivo?: string;
}

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './reservas.component.html'
})
export class ReservasComponent implements OnInit, AfterViewInit {
  private readonly storageKey = 'javaEspressoReservas';
  readonly minDate = this.formatDate(new Date());
  readonly horasBase: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  servicios: ServicioReserva[] = [
    { value: 'cabina-ind', label: 'Cabina Insonorizada Individual (1 pers.)', grupo: 'Espacios y Salas' },
    { value: 'cabina-dob', label: 'Cabina Insonorizada Doble (2 pers.)', grupo: 'Espacios y Salas' },
    { value: 'reuniones', label: 'Sala de Reuniones', grupo: 'Espacios y Salas' },
    { value: 'privada', label: 'Sala Privada', grupo: 'Espacios y Salas' },
    { value: 'gaming-sala', label: 'Sala Gaming', grupo: 'Espacios y Salas' },
    { value: 'gaming-low', label: 'Equipo Gaming Lowcost', grupo: 'Equipos Gaming' },
    { value: 'gaming-idra', label: 'Equipo Gaming Idra', grupo: 'Equipos Gaming' },
    { value: 'gaming-ultra', label: 'Equipo Gaming Ultra', grupo: 'Equipos Gaming' },
    { value: 'work-base', label: 'Productividad Básica', grupo: 'Equipos de Trabajo' },
    { value: 'work-pro', label: 'Workstation Pro', grupo: 'Equipos de Trabajo' },
    { value: 'work-server', label: 'Servidor Empresarial', grupo: 'Equipos de Trabajo' }
  ];

  reserva = this.obtenerReservaPorDefecto();

  horasDisponibles: HoraDisponible[] = [];
  reservas: Reserva[] = [];
  mensajeConfirmacion = '';
  mensajeError = '';

  ngOnInit(): void {
    this.reservas = this.cargarReservas();
    this.actualizarHorasDisponibles();
  }

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
  }

  get serviciosAgrupados(): { grupo: string; items: ServicioReserva[] }[] {
    const grupos: { grupo: string; items: ServicioReserva[] }[] = [];
    for (const servicio of this.servicios) {
      let grupoActual = grupos.find((grupo) => grupo.grupo === servicio.grupo);
      if (!grupoActual) {
        grupoActual = { grupo: servicio.grupo, items: [] };
        grupos.push(grupoActual);
      }
      grupoActual.items.push(servicio);
    }
    return grupos;
  }

  actualizarHorasDisponibles(): void {
    this.mensajeError = '';
    this.horasDisponibles = this.horasBase.map((hora) => this.validarHora(hora));
    this.reserva.horas = this.reserva.horas.filter((hora) =>
      this.horasDisponibles.some((item) => item.hora === hora && item.disponible)
    );
  }

  alternarHora(hora: string): void {
    this.limpiarMensajeConfirmacion();
    const estado = this.horasDisponibles.find((item) => item.hora === hora);
    if (!estado?.disponible) {
      return;
    }

    if (this.reserva.horas.includes(hora)) {
      this.reserva.horas = this.reserva.horas.filter((horaSeleccionada) => horaSeleccionada !== hora);
    } else {
      this.reserva.horas = [...this.reserva.horas, hora].sort();
    }
  }

  horaSeleccionada(hora: string): boolean {
    return this.reserva.horas.includes(hora);
  }

  confirmarReserva(form: NgForm): void {
    this.mensajeConfirmacion = '';
    this.mensajeError = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.mensajeError = 'Completa todos los campos obligatorios antes de confirmar la reserva.';
      return;
    }

    if (this.reserva.horas.length === 0) {
      this.mensajeError = 'Selecciona una o varias horas disponibles para confirmar la reserva.';
      return;
    }

    const horasNoDisponibles = this.reserva.horas.filter((hora) => !this.validarHora(hora).disponible);
    if (horasNoDisponibles.length > 0) {
      this.mensajeError = `Alguna hora seleccionada ya no está disponible: ${horasNoDisponibles.join(', ')}.`;
      this.actualizarHorasDisponibles();
      return;
    }

    const servicioNombre = this.obtenerNombreServicio(this.reserva.servicio);
    const horasReservadas = [...this.reserva.horas].sort();
    const nuevaReserva: Reserva = {
      nombre: this.reserva.nombre.trim(),
      email: this.reserva.email.trim(),
      fecha: this.reserva.fecha,
      hora: horasReservadas[0],
      servicio: this.reserva.servicio,
      servicioNombre,
      personas: Number(this.reserva.personas),
      duracion: horasReservadas.length,
      horasBloqueadas: horasReservadas,
      creadaEn: new Date().toISOString()
    };

    this.reservas.push(nuevaReserva);
    this.guardarReservas();
    this.mensajeConfirmacion = `Reserva confirmada para ${servicioNombre} el ${this.formatearFecha(nuevaReserva.fecha)}. Horas reservadas: ${horasReservadas.join(', ')}.`;

    this.reserva = this.obtenerReservaPorDefecto();
    form.resetForm(this.reserva);
    this.actualizarHorasDisponibles();
  }

  limpiarMensajeConfirmacion(): void {
    this.mensajeConfirmacion = '';
  }

  limpiarMensajeError(): void {
    this.mensajeError = '';
  }

  reservasDelDia(): Reserva[] {
    return this.reservas
      .filter((reserva) => reserva.fecha === this.reserva.fecha)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  private validarHora(hora: string): HoraDisponible {
    if (!this.reserva.fecha || !this.reserva.servicio) {
      return { hora, disponible: false, motivo: 'Selecciona fecha y servicio primero.' };
    }

    if (this.reserva.fecha < this.minDate) {
      return { hora, disponible: false, motivo: 'No puedes reservar fechas pasadas.' };
    }

    if (this.esHoraPasada(hora)) {
      return { hora, disponible: false, motivo: 'Esta hora ya ha pasado hoy.' };
    }

    const ocupada = this.reservas.some(
      (reserva) =>
        reserva.fecha === this.reserva.fecha &&
        reserva.servicio === this.reserva.servicio &&
        reserva.horasBloqueadas.includes(hora)
    );

    if (ocupada) {
      return { hora, disponible: false, motivo: 'Hora ocupada para este servicio.' };
    }

    return { hora, disponible: true };
  }

  private esHoraPasada(hora: string): boolean {
    if (this.reserva.fecha !== this.minDate) {
      return false;
    }
    const ahora = new Date();
    const [horas, minutos] = hora.split(':').map(Number);
    const fechaHora = new Date();
    fechaHora.setHours(horas, minutos, 0, 0);
    return fechaHora <= ahora;
  }

  private cargarReservas(): Reserva[] {
    const datos = localStorage.getItem(this.storageKey);
    if (!datos) {
      return [];
    }

    try {
      const reservas = JSON.parse(datos) as Reserva[];
      return reservas.filter((reserva) => reserva.fecha >= this.minDate);
    } catch {
      return [];
    }
  }

  private guardarReservas(): void {
    const reservasActuales = this.reservas.filter((reserva) => reserva.fecha >= this.minDate);
    localStorage.setItem(this.storageKey, JSON.stringify(reservasActuales));
  }

  private obtenerNombreServicio(value: string): string {
    return this.servicios.find((servicio) => servicio.value === value)?.label ?? value;
  }

  private obtenerReservaPorDefecto(): { nombre: string; email: string; fecha: string; servicio: string; personas: number; horas: string[] } {
    return {
      nombre: '',
      email: '',
      fecha: this.minDate,
      servicio: '',
      personas: 1,
      horas: []
    };
  }

  private formatearFecha(fecha: string): string {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
