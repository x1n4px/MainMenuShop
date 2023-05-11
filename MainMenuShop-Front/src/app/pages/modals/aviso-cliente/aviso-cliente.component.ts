import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
  @Component({
  selector: 'app-aviso-cliente',
  templateUrl: './aviso-cliente.component.html',
  styleUrls: ['./aviso-cliente.component.css']
})
export class AvisoClienteComponent {


  clienteActual: any;


  constructor(
    public dialogRef: MatDialogRef<AvisoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.clienteActual = data.clienteActual;
     console.log(this.clienteActual);
   }

}
