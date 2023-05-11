import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
  @Component({
  selector: 'app-devolucion-dinero',
  templateUrl: './devolucion-dinero.component.html',
  styleUrls: ['./devolucion-dinero.component.css']
})
export class DevolucionDineroComponent   {
  total:any;
  dineroEfectivo:any;
  constructor(
    public dialogRef: MatDialogRef<DevolucionDineroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.total = data.total;
    this.dineroEfectivo = data.dineroEfectivo;
  }

}
