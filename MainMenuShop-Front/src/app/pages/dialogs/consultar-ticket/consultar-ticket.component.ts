import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/ Productos';
import { Producto } from 'src/app/Producto';

import { Ticket } from 'src/app/Ticket';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-consultar-ticket',
  templateUrl: './consultar-ticket.component.html',
  styleUrls: ['./consultar-ticket.component.css']
})
export class ConsultarTicketComponent implements OnInit{

  constructor(
  public dialogRef: MatDialogRef<ConsultarTicketComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private loginService:LoginService
  ) {
 
  }
  ngOnInit(): void {
    this.obtenerTodosTicket();
  }



  consultarTicket:boolean = false;

 
  ticketBD: Ticket[] = [];
  ticketBusqueda: Ticket[] = [];
  ticketActual: Ticket = new Ticket();
  nombreTicketSeleccionado!:string;
  productosTicketSeleccionado!:Productos;
  refTicket!:string;
  buscar:boolean = false;
 
  seleccionarTicket(Ticket: Ticket){
    this.ticketActual = Ticket;
    this.nombreTicketSeleccionado = Ticket.cliente.nombre + ' ' + Ticket.cliente.apellido1 + ' ' + Ticket.cliente.apellido2;
    this.consultarTicket = true;
  }

  obtenerTodosTicket() {
    this.loginService.obtenerTodosLosTicket().subscribe(
      (ticket: Ticket[]) => {
        this.ticketBD = ticket;
      },
      (error) => {
       }

    );

  }

  buscarTicket(){
     this.loginService.buscarTicket(this.refTicket)
      .subscribe(tickets => {
         this.ticketBusqueda = tickets;
         this.buscar = true;
       }, error => {
        this.buscar = false;
      });
  }


}
