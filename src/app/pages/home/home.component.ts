import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductoService } from '../../producto.service';
import { Producto } from '../../producto';

declare const AOS: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  productosDestacados: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productosDestacados = productos.slice(0, 3);
    });
  }

  cerrarModalesBootstrap(): void {
    document.querySelectorAll('.modal.show').forEach((modal) => modal.classList.remove('show'));
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
  }


  scrollToServiciosDestacados(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const section = document.getElementById('servicios-destacados');
    if (!section) return;

    const navbar = document.querySelector('nav, .navbar') as HTMLElement | null;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: 'smooth'
    });
  }

  ngAfterViewInit(): void {
    // AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }

    // Splash screen
const splash = document.getElementById('splash-screen');
if (splash) {
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => splash.classList.add('d-none'), 1000);
  }, 100);
}

    // Hero background carousel
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    const btnDiscover = document.getElementById('btn-discover');
    if (heroSection) {
const images = [
  'img/espacioDeTrabajo.png',
  'img/zonaTrabajo.png',
  'img/salaPrivada.png',
  'img/salaGaming.png'
];
      let currentIndex = 0;
      images.forEach(src => { const img = new Image(); img.src = src; });
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
      }, 4000);

      if (btnDiscover) {
        btnDiscover.addEventListener('mouseenter', () => heroSection.classList.add('hero-active'));
        btnDiscover.addEventListener('mouseleave', () => heroSection.classList.remove('hero-active'));
        btnDiscover.addEventListener('click', (event) => this.scrollToServiciosDestacados(event));
      }
    }

    // Spec modal interactions
    const specifications: Record<number, any> = {
      1: {
        items: ['<strong>Procesador:</strong> Intel Core i5-13600K','<strong>Memoria RAM:</strong> 16 GB DDR4','<strong>Almacenamiento:</strong> SSD NVMe 512GB','<strong>GPU:</strong> NVIDIA RTX 4060 Ti','<strong>Monitor:</strong> 1080p 144Hz IPS','<strong>Conectividad:</strong> WiFi 6, Gigabit Ethernet','<strong>Refrigeración:</strong> Aire con sistemas silenciosos'],
        description: 'Equipo accesible con excelente relación rendimiento-precio, ideal para gaming casual y trabajo productivo.'
      },
      2: {
        items: ['<strong>Procesador:</strong> Intel Core i7-13700K','<strong>Memoria RAM:</strong> 16 GB DDR5 6000MHz','<strong>Almacenamiento:</strong> SSD NVMe 1TB Gen 4','<strong>GPU:</strong> NVIDIA RTX 4070 Ti','<strong>Monitor:</strong> 1440p 165Hz','<strong>Conectividad:</strong> WiFi 6E, Gigabit Ethernet','<strong>Refrigeración:</strong> Aire con torres de 240mm'],
        description: 'Equipo versátil perfecto para gaming competitivo, streaming y producción de contenido multimedia.'
      },
      3: {
        items: ['<strong>Procesador:</strong> Intel Core i9-13900K','<strong>Memoria RAM:</strong> 32 GB DDR5 7200MHz','<strong>Almacenamiento:</strong> SSD NVMe 2TB Gen 4','<strong>GPU:</strong> NVIDIA RTX 5090','<strong>Monitor:</strong> 4K 280Hz OLED','<strong>Conectividad:</strong> WiFi 7, Gigabit Ethernet','<strong>Refrigeración:</strong> Líquida 360mm RGB'],
        description: 'Equipo de gama alta con máximo rendimiento para gaming extremo y trabajo profesional de alto nivel.'
      }
    };

    const specificationsWork: Record<number, any> = {
      1: {
        items: ['<strong>Procesador:</strong> Intel Core i5-13600','<strong>Memoria RAM:</strong> 16 GB DDR4 3200MHz','<strong>Almacenamiento:</strong> SSD NVMe 512GB','<strong>GPU:</strong> Intel UHD 770','<strong>Monitor:</strong> 1080p IPS 24 pulgadas','<strong>Conectividad:</strong> WiFi 6, Gigabit Ethernet','<strong>Refrigeración:</strong> Aire pasivo silencioso'],
        description: 'Equipo compacto y silencioso perfecto para tareas de ofimática, navegación web y videoconferencias.'
      },
      2: {
        items: ['<strong>Procesador:</strong> Intel Core i7-13700H','<strong>Memoria RAM:</strong> 32 GB DDR5 5600MHz','<strong>Almacenamiento:</strong> SSD NVMe 1TB Gen 4','<strong>GPU:</strong> NVIDIA RTX 4070 Super','<strong>Monitor:</strong> 1440p OLED 27 pulgadas','<strong>Conectividad:</strong> WiFi 6E, 2x Gigabit Ethernet','<strong>Refrigeración:</strong> Agua 240mm + Aire'],
        description: 'Workstation potente para diseño gráfico, edición de video, programación y aplicaciones profesionales exigentes.'
      },
      3: {
        items: ['<strong>Procesador:</strong> Intel Xeon W9-3595X','<strong>Memoria RAM:</strong> 128 GB DDR5 RDIMM','<strong>Almacenamiento:</strong> 4x SSD NVMe 2TB RAID 10','<strong>GPU:</strong> NVIDIA RTX 6000 Ada 48GB','<strong>Monitor:</strong> 4K UHD OLED 32 pulgadas','<strong>Conectividad:</strong> WiFi 7, 4x 10G Ethernet','<strong>Refrigeración:</strong> Líquida industrial 480mm'],
        description: 'Sistema de servidor ultra potente para rendering profesional, machine learning y computación científica.'
      }
    };

    const setupSpecCards = (selector: string, listId: string, descId: string, specs: Record<number, any>) => {
      const cards = document.querySelectorAll(selector);
      if (!cards.length) return;
      cards[0].classList.add('border-dark', 'border-3');
      cards.forEach(card => {
        card.addEventListener('click', function (this: HTMLElement) {
          const num = parseInt(this.getAttribute('data-spec') || this.getAttribute('data-spec-work') || '1');
          const spec = specs[num];
          const list = document.getElementById(listId);
          const desc = document.getElementById(descId);
          if (list) list.innerHTML = spec.items.map((i: string) => `<li class="mb-2">${i}</li>`).join('');
          if (desc) desc.textContent = spec.description;
          cards.forEach(c => c.classList.remove('border-dark', 'border-3'));
          this.classList.add('border-dark', 'border-3');
        });
      });
    };

    setupSpecCards('.photo-card', 'specList', 'specDesc', specifications);
    setupSpecCards('.photo-card-work', 'specListWork', 'specDescWork', specificationsWork);
  }
}
