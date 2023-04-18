import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/ Productos';
import { Producto } from 'src/app/Producto';

import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-consultar-ticket',
  templateUrl: './consultar-ticket.component.html',
  styleUrls: ['./consultar-ticket.component.css']
})
export class ConsultarTicketComponent {

  constructor(
  public dialogRef: MatDialogRef<ConsultarTicketComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  this.ticketBD = data.ticketBD;
  console.log(this.ticketBD);
  }



  consultarTicket:boolean = false;


  ticketBD: Ticket[] = [];
  ticketActual: Ticket = new Ticket();
  nombreTicketSeleccionado!:string;
  productosTicketSeleccionado!:Productos;


  seleccionarTicket(Ticket: Ticket){
    this.ticketActual = Ticket;
    this.nombreTicketSeleccionado = Ticket.cliente.nombre + ' ' + Ticket.cliente.apellido1 + ' ' + Ticket.cliente.apellido2;
    this.consultarTicket = true;
  }




}
