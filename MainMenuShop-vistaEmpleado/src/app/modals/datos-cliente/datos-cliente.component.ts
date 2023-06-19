import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/class/cliente';
import { Ticket } from 'src/app/class/ticket';
import { LoginServiceService } from 'src/app/login-service.service';
@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css']
})
export class DatosClienteComponent {
  nuevoCliente: Cliente = new Cliente;
  clienteActual: any;
  editable: any;
  tickets: Ticket[] = [];
  // 0 -> datos cliente
  // 1 -> crear cliente
  // 2 -> editar cliente
  boton: number = 0;
  // 0 -> datos
  // 1 -> vales
  // 2 -> Tickets
  // 3 -> Comentarios

  constructor(
    public dialogRef: MatDialogRef<DatosClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginServiceService
  ) {
    this.clienteActual = data.clienteActual;
    this.editable = data.editable;
    console.log(this.editable);
  }

  onSubmit(): void {
    this.dialogRef.close(this.clienteActual);
    this.obtenerTickets();
  }


  terminarCompraEfectivo() {
    if (this.editable === 1) {
      console.log(this.nuevoCliente);
      this.dialogRef.close({
        nuevoCliente: this.nuevoCliente,
      });
    }
  }


  obtenerTickets() {
    this.loginService.buscarTicketCliente(this.clienteActual.id)
    .subscribe(tickets => {
      console.log(tickets);
      this.tickets = tickets;
     }, error => {
     });
  }





}
