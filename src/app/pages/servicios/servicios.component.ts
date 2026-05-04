import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
  }
}
