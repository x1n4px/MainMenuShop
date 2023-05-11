import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
  @Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.css']
})
export class CierreCajaComponent  {

  usuarioActual:any;
  opcion:number = 0;
  constructor(
    public dialogRef: MatDialogRef<CierreCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.usuarioActual = data.usuarioActual;
      this.opcion = data.numero;
    }

}
