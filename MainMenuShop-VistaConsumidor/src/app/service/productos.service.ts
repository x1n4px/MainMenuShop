import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Producto } from '../class/producto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }


  obtenerTodosLosProductos(cantidad: number, familia: String) {
    return this.http.get<Producto[]>(`http://localhost:8080/producto/todos?cantidad=`+cantidad+`&familia=`+familia);
  }

  buscarProducto(busqueda: string) {

    return this.http.get<Producto[]>(`http://localhost:8080/buscar?nombre=`+busqueda+`&cantidad=1`);
  }

  obtenerProductoPorId(id: number) {
    return this.http.get<Producto>('http://localhost:8080/producto/'+ id );
  }

  obtenerFiltradoRapido(familia: String, categoria: String) {
    return this.http.get<Producto[]>(`http://localhost:8080/productos/Filtrados/CategoriaFamilia?familia=`+familia+`&categoria=`+categoria);
  }

  guardar(producto: Producto) {
    return this.http.post<Producto>(`http://localhost:8080/productos/guardar`, producto);
  }
}
