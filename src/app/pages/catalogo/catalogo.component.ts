import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

declare const AOS: any;

interface ProductoCarrito {
    nombre: string;
    precio: number;
    cantidad: number;
}

@Component({
    selector: 'app-catalogo',
    standalone: true,
    imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule],
    templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements AfterViewInit {

    carrito: ProductoCarrito[] = [];
    carritoAbierto = false;

    get total(): number {
        return this.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    }

    get totalItems(): number {
        return this.carrito.reduce((acc, p) => acc + p.cantidad, 0);
    }

    agregarAlCarrito(nombre: string, precioStr: string) {
        const precio = parseFloat(precioStr.replace(',', '.').replace('€', '').replace('+', '').trim());
        if (isNaN(precio)) return;
        const existente = this.carrito.find(p => p.nombre === nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            this.carrito.push({ nombre, precio, cantidad: 1 });
        }
    }

    eliminarDelCarrito(nombre: string) {
        this.carrito = this.carrito.filter(p => p.nombre !== nombre);
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
}