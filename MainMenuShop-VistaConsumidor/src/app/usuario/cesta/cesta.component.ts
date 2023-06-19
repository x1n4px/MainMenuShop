import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  constructor(private sharedService: SharedServiceService, private router: Router, public dialog: MatDialog, private snack: MatSnackBar) {
    this.cesta = this.sharedService.obtenercesta();
    this.calcularCesta();
  }

  ajusteTotal: number = 0;

  cesta:any[] = [];
  precioCesta:number = 0;
  cliente:any = 'Juan';
  calcularCesta() {
    this.precioCesta = 0;
    for ( let i = 0; i < this.cesta.length; i++) {
      this.precioCesta += (this.cesta[i].precioNeto + (this.cesta[i].precioNeto*(this.cesta[i].ivaAsociado/100)));
    }
    this.ajusteTotal = this.precioCesta < 49 ? 4.99 : 0;

  }


  eliminarArticulo(dato:any){
    const indice = this.cesta.indexOf(dato);
    if (indice !== -1) {
       this.sharedService.quitarElementoDeCesta(indice);
    }

     this.calcularCesta();
  }

  modalPago() {

  }
}
