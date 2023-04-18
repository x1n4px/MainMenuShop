import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/ Productos';
import { Producto } from 'src/app/Producto';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css']
})
export class DatosClienteComponent {

  clienteActual: any;
  editable!:boolean;
  boton:number = 0;
  // 0 -> datos
  // 1 -> vales
  // 2 -> Tickets
  // 3 -> Comentarios

  constructor(
    public dialogRef: MatDialogRef<DatosClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.clienteActual = data.clienteActual;
    this.editable = data.editable;
    console.log(this.clienteActual);
   }

  onSubmit(): void {
    this.dialogRef.close(this.clienteActual);
}

}
