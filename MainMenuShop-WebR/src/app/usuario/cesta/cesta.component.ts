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


  cesta:any[] = [];
  precioCesta:number = 0;
  cliente:any = 'Juan';
  calcularCesta() {
    this.precioCesta = 0;
    for ( let i = 0; i < this.cesta.length; i++) {
      this.precioCesta += parseFloat(this.cesta[i].precio);
    }
  }


  eliminarArticulo(dato:any){
    const indice = this.cesta.indexOf(dato);
    if (indice !== -1) {
      this.cesta.splice(indice, 1);
    }
    this.calcularCesta();
  }

  modalPago() {

  }
}
