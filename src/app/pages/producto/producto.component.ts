import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../producto.service';
import { CarritoService } from '../../carrito.service';
import { Producto } from '../../producto';

@Component({
    selector: 'app-producto',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
    templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

    producto: Producto | null = null;
    agregado = false;

    constructor(
        private route: ActivatedRoute,
        private productoService: ProductoService,
        private carritoService: CarritoService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productoService.getProductos().subscribe(productos => {
            this.producto = productos.find(p => p.id === id) || null;
        });
    }

    agregarYVolver(): void {
        if (this.producto) {
            this.carritoService.agregar(this.producto.nombre, this.producto.precio);
            this.agregado = true;
        }
    }
}