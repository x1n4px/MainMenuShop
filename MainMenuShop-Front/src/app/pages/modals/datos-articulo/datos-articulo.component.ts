import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-articulo',
  templateUrl: './datos-articulo.component.html',
  styleUrls: ['./datos-articulo.component.css']
})
export class DatosArticuloComponent  {

  constructor(
    public dialogRef: MatDialogRef<DatosArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.productoActual = data.productoActual;
   }

  productoActual: any;


}
