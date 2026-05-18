import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../producto.service';
import { CarritoService } from '../../carrito.service';
import { Producto } from '../../producto';

declare const AOS: any;

@Component({
    selector: 'app-catalogo',
    standalone: true,
    imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule],
    templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements AfterViewInit {

    carritoAbierto = false;
    productos: Producto[] = [];

    constructor(
        private productoService: ProductoService,
        private carritoService: CarritoService
    ) {
        this.productoService.getProductos().subscribe(data => {
            this.productos = data;
        });
    }

    getProductosPorCategoria(categoria: string): Producto[] {
        return this.productos.filter(p => p.categoria === categoria);
    }

    get carrito() {
        return this.carritoService.getCarrito();
    }

    get total(): number {
        return this.carritoService.getTotal();
    }

    get totalItems(): number {
        return this.carritoService.getTotalItems();
    }

    agregarAlCarrito(nombre: string, precio: number) {
        this.carritoService.agregar(nombre, precio);
    }

    eliminarDelCarrito(nombre: string) {
        this.carritoService.eliminar(nombre);
    }

    toggleCarrito() {
        this.carritoAbierto = !this.carritoAbierto;
    }

    ngAfterViewInit(): void {
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
        }
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
    }

    irASeccion(idSeccion: string, event?: Event): void {
        if (event) event.preventDefault();
        setTimeout(() => {
            const seccion = document.getElementById(idSeccion);
            if (!seccion) return;
            const navbar = document.querySelector('app-navbar') as HTMLElement | null;
            const offsetNavbar = navbar?.offsetHeight || 85;
            const posicion = seccion.getBoundingClientRect().top + window.scrollY - offsetNavbar - 12;
            window.scrollTo({ top: Math.max(posicion, 0), behavior: 'smooth' });
        }, 250);
    }
}