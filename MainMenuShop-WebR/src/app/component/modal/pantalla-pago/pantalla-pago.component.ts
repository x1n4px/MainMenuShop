import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pantalla-pago',
  templateUrl: './pantalla-pago.component.html',
  styleUrls: ['./pantalla-pago.component.css']
})
export class PantallaPagoComponent {
  cesta:any[] = [];
  cliente:any ;
  constructor(
    public dialogRef: MatDialogRef<PantallaPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cesta = data.cesta;
    this.cliente = data.cliente;
  }
}
