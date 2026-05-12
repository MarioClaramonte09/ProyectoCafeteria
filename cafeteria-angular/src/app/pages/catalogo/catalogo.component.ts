import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
    // Catalog filter menu
    const menuLinks = document.querySelectorAll('#menu-filtros .nav-link');
    const sections = document.querySelectorAll('.catalogo-section');

    menuLinks.forEach(link => {
      link.addEventListener('click', function(this: HTMLElement, e: Event) {
        const filter = this.getAttribute('data-filter');
        menuLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        if (filter === 'all') {
          sections.forEach(s => (s as HTMLElement).style.display = '');
        }
      });
    });

    // Product modal
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('click', function(this: HTMLElement) {
        const name = this.getAttribute('data-product-name') || '';
        const desc = this.getAttribute('data-product-description') || '';
        const price = this.getAttribute('data-product-price') || '';
        const image = this.getAttribute('data-product-image') || '';
        const modalName = document.getElementById('productModalName');
        const modalDesc = document.getElementById('productModalDescription');
        const modalPrice = document.getElementById('productModalPrice');
        const modalImg = document.getElementById('productModalImage') as HTMLImageElement;
        if (modalName) modalName.textContent = name;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalPrice) modalPrice.textContent = price;
        if (modalImg) modalImg.src = image;
      });
    });
  }
    irASeccion(idSeccion: string, event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        // Esperamos un momento para que Bootstrap cierre el menú lateral de la lupa.
        setTimeout(() => {
            const seccion = document.getElementById(idSeccion);
            if (!seccion) return;

            const navbar = document.querySelector('app-navbar') as HTMLElement | null;
            const offsetNavbar = navbar?.offsetHeight || 85;
            const posicion = seccion.getBoundingClientRect().top + window.scrollY - offsetNavbar - 12;

            window.scrollTo({
                top: Math.max(posicion, 0),
                behavior: 'smooth'
            });
        }, 250);
    }

}
