import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-gato',
  templateUrl: './gato.component.html',
  styleUrls: ['./gato.component.css']
})
export class GatoComponent implements OnInit {

  constructor(private route:Router, private productServ: ProductosService ){}


  //Variables
  Lista: Producto[] = [];

  //Funciones
  ngOnInit(): void {
    this.obtenerTickets();
  }

  obtenerTickets() {
    this.productServ.obtenerTodosLosProductos().subscribe(
      (productos: Producto[]) => {
        this.Lista = productos;
      }
    )
  }


}
