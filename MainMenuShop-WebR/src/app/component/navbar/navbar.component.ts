import { Component, ElementRef, ViewChild } from '@angular/core';
import { PerroComponent } from '../familia/perro/perro.component';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { Router } from '@angular/router';
import { BusquedaArticulosComponent } from '../modal/busqueda-articulos/busqueda-articulos.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cesta:any[];
  constructor(private sharedService: SharedServiceService, private router: Router, public dialog: MatDialog, private snack: MatSnackBar) {
    this.cesta = this.sharedService.obtenercesta();
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
      this.precioCesta += parseFloat(this.cesta[i].precio);
    }
  }


  irA(ruta:any){
    this.router.navigate([ruta]);
    const checkbox = document.getElementById('nav-check') as HTMLInputElement;
    checkbox.checked = false;


  }


}
