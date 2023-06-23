import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-producto-f',
  templateUrl: './producto-f.component.html',
  styleUrls: ['./producto-f.component.css']
})
export class ProductoFComponent implements OnInit{
  tituloProducto: any;
  id:any;
  producto!: Producto;
  productosSimilares: Producto[] = [];
  //constructor(private route:ActivatedRoute , private router:Router, private productoServ: ProductosService, private shared: SharedServiceService) { }
  constructor(
    public dialogRef: MatDialogRef<ProductoFComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private route:ActivatedRoute , private router:Router, private productoServ: ProductosService, private shared: SharedServiceService) {
    this.producto = data.product;

  }
   categoria!: String;
  nombre!:String;
  imagen!:String;
  contenido!:String;

  ngOnInit(): void {
    this.obtenerProducto();
     this.categoria = this.producto.categoría;
   this.nombre = this.producto.nombre;
   this.imagen = this.producto.imagen;
   this.contenido = this.producto.descripcion;
  }


  obtenerProducto() {
    let nombre = this.producto.nombre;
    let longitud = nombre.length;
    let porcentaje = Math.floor(longitud*0.25);
    let nombreRecortado = nombre.substring(0, longitud-porcentaje);
    this.productoServ.buscarProducto(nombreRecortado).subscribe(
      (productos: Producto[]) => {
        this.productosSimilares = productos.filter(producto => producto.familia === this.producto.familia);
      }
    );
  }



  aniadirCesta(producto: Producto) {
    producto.animated = true;
    setTimeout(() => {
      producto.animated = false; // Desactivar la animación después de 2 segundos
     }, 2000);
    this.shared.aniadirProductoCesta(this.producto);
  }

}
