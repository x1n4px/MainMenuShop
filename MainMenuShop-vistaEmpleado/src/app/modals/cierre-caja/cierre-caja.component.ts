import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.css']
})
export class CierreCajaComponent {
  paso:number = 0;
  usuarioActual: any;
  opcion: number = 0;
  suma:number = 0;
  constructor(
    public dialogRef: MatDialogRef<CierreCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuarioActual = data.usuarioActual;
    this.opcion = data.numero;
  }

   billete500:number = 0;
  efectivo: any = {
    billete500: 0,
    billete200:0,
    billete100:0,
    billete50: 0,
    billete20: 0,
    billete10: 0,
    billete5: 0,
    moneda2: 0,
    moneda1:0,
    moneda50: 0,
    moneda20: 0,
    moneda10: 0,
    moneda05: 0,
    moneda02: 0,
    moneda01: 0
  }



contabilizacion() {
  this.paso = 1;
  this.suma = this.efectivo.billete500*500+
              this.efectivo.billete200*200+
              this.efectivo.billete100*100+
              this.efectivo.billete50*50+
              this.efectivo.billete20*20+
              this.efectivo.billete10*10+
              this.efectivo.billete5*5+
              this.efectivo.moneda2*2+
              this.efectivo.moneda1*1+
              this.efectivo.moneda50*0.50+
              this.efectivo.moneda20*0.20+
              this.efectivo.moneda10*0.10+
              this.efectivo.moneda05*0.05+
              this.efectivo.moneda02*0.02+
              this.efectivo.moneda01*0.01
  ;
}

retiradaDinero() {

}


}
