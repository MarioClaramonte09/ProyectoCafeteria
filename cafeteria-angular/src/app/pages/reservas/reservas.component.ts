import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './reservas.component.html'
})
export class ReservasComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
    // Reservation form validation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', function(e: Event) {
        e.preventDefault();
        const confirmation = document.getElementById('confirmationMessage');
        if (confirmation) {
          confirmation.classList.remove('d-none');
          confirmation.scrollIntoView({ behavior: 'smooth' });
        }
        (reservationForm as HTMLFormElement).reset();
      });
    }
  }
}
