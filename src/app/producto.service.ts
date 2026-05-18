import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'data/productos.json';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  getProductoPorId(id: number): Observable<Producto | undefined> {
    return this.getProductos().pipe(
      map(productos => productos.find(producto => producto.id === id))
    );
  }
}
