import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  tituloProducto: any;
  id:any;
  constructor(private route:ActivatedRoute , private router:Router, private productoServ: ProductosService, private shared: SharedServiceService) { }
  producto!: Producto;
  categoria!: String;
  nombre!:String;
  imagen!:String;
  contenido!:String;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tituloProducto = params['titulo'];
      this.id = params['id'];
      // Utiliza el título del producto como desees
    });
    this.obtenerProducto();
  }


  obtenerProducto() {
    this.productoServ.obtenerProductoPorId(this.id).subscribe(
      (producto: Producto) => {
        this.producto = producto;
        this.categoria = producto.categoría;
        this.nombre = producto.nombre;
        this.imagen = producto.imagen;
        this.contenido = producto.descripcion;

      }
    );
  }



  aniadirCesta() {
    this.shared.aniadirProductoCesta(this.producto);
  }

}
