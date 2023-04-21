import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/ Productos';
import { Cliente } from 'src/app/Cliente';
import { Producto } from 'src/app/Producto';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css']
})
export class DatosClienteComponent {
  nuevoCliente:Cliente = new Cliente;
  clienteActual: any;
  editable:any;
  // 0 -> datos cliente
  // 1 -> crear cliente
  // 2 -> editar cliente
  boton:number = 0;
  loginService: any;
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


terminarCompraEfectivo() {
  if (this.editable === 3) {
    console.log(this.nuevoCliente);
    this.dialogRef.close({
      nuevoCliente: this.nuevoCliente,
    });
  }
}


}
