import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../producto.service';
import { Producto } from '../../producto';

@Component({
    selector: 'app-producto',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
    templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

    producto: Producto | null = null;

    constructor(
        private route: ActivatedRoute,
        private productoService: ProductoService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productoService.getProductos().subscribe(productos => {
            this.producto = productos.find(p => p.id === id) || null;
        });
    }
agregarYVolver(): void {
    if (this.producto) {
        alert(`"${this.producto.nombre}" añadido al carrito`);
    }
}
}