import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerroComponent } from '../familia/perro/perro.component';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { Router } from '@angular/router';
import { BusquedaArticulosComponent } from '../modal/busqueda-articulos/busqueda-articulos.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon'
import { ProductosService } from 'src/app/service/productos.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  cesta:any[];
  resultados!: any[];
  terminoBusqueda!: string;
  mostrarResultados: boolean = false;




  constructor(private productooService: ProductosService, private sharedService: SharedServiceService, private router: Router, public dialog: MatDialog, private snack: MatSnackBar) {
    this.cesta = this.sharedService.obtenercesta();

  }

  ngOnInit(): void {

  }


  navegarAPerro(route: any): void {
    const dato = route;

    // Navegar a la página Perro y pasar el dato como parámetro en la URL
    this.router.navigate(['/perro'], { queryParams: { dato } });
  }

  isCardOpen: boolean = false;
  mostrar:boolean = false;
  precioCesta: number = 0;
  mostrarCesta(){
    this.mostrar = !this.mostrar;
    this.calcularCesta()
  }

  calcularCesta() {
    this.precioCesta = 0;
    for ( let i = 0; i < this.cesta.length; i++) {
      this.precioCesta += (this.cesta[i].precioNeto)+(this.cesta[i].precioNeto * (this.cesta[i].ivaAsociado/100));
    }
  }


  irA(ruta:any){
    this.router.navigate([ruta]);
    const checkbox = document.getElementById('nav-check') as HTMLInputElement;
    checkbox.checked = false;


  }


  buscar() {
    this.productooService.buscarProducto(this.terminoBusqueda)
      .subscribe(productos => {
        this.resultados = productos;
        console.log(this.resultados);
      }, error => {
        this.resultados = [];
      });
  }


  seleccionarResultado(dato:any) {
    this.router.navigate(['perro']);
  }
}
