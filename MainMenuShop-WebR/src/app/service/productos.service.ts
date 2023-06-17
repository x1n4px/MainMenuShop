import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Producto } from '../class/producto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }


  obtenerTodosLosProductos() {
    return this.http.get<Producto[]>(`http://localhost:8080/producto/todos?cantidad=1`);
  }

  buscarProducto(busqueda: string) {

    return this.http.get<Producto[]>(`http://localhost:8080/buscar?nombre=${busqueda}`);
  }

  obtenerProductoPorId(id: number) {
    return this.http.get<Producto>('http://localhost:8080/producto/'+ id );
  }


}
