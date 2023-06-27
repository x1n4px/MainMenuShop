import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';
import { ProductoFComponent } from '../modal/producto-f/producto-f.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  palabras: string[] = ['amigo', 'colega', 'compañero', 'mascota'];
  palabraActual: string = 'amigo';
  datosP: Producto[] = [];
  datosG: Producto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar, private router: Router, private productoService: ProductosService) { }

  ngOnInit(): void {
    this.actualizarPalabra();
    this.obtenerProductos('gato', 4, 'gato');
    this.obtenerProductos('perro', 4, 'perro');
  }


  go(route: string) {
    this.router.navigate(['', route]);
  }

   actualizarPalabra() {
    let index = 0;
    setInterval(() => {
      this.palabraActual = this.palabras[index];
      index = (index + 1) % this.palabras.length;
    }, 2000);
  }


  obtenerProductos(array:any, cantidadMostrada: number, familia: string) {
      this.productoService.obtenerTodosLosProductos(cantidadMostrada, familia).subscribe(
      (productos: Producto[]) => {
        if(array === 'gato'){
          this.datosG = productos;
        }else{
          this.datosP = productos;
        }

       }, (error) => {

      }
    );
  }

  verDetallesProducto(dato: Producto) {
    const dialogRef = this.dialog.open(ProductoFComponent, { data: { product: dato } });
  }
}
