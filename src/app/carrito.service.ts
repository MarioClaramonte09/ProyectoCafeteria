import { Injectable } from '@angular/core';

interface ProductoCarrito {
    nombre: string;
    precio: number;
    cantidad: number;
}

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private carrito: ProductoCarrito[] = [];

    getCarrito(): ProductoCarrito[] {
        return this.carrito;
    }

    agregar(nombre: string, precio: number): void {
        const existente = this.carrito.find(p => p.nombre === nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            this.carrito.push({ nombre, precio, cantidad: 1 });
        }
    }

    eliminar(nombre: string): void {
        this.carrito = this.carrito.filter(p => p.nombre !== nombre);
    }

    getTotal(): number {
        return this.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    }

    getTotalItems(): number {
        return this.carrito.reduce((acc, p) => acc + p.cantidad, 0);
    }
}