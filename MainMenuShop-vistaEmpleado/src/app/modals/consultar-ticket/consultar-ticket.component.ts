import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/class/productos';
import { Producto } from 'src/app/class/producto';
import { ProductoTicket, TProductos } from 'src/app/class/producto-ticket';

import { Ticket } from 'src/app/class/ticket';
import { LoginServiceService } from 'src/app/login-service.service';
@Component({
  selector: 'app-consultar-ticket',
  templateUrl: './consultar-ticket.component.html',
  styleUrls: ['./consultar-ticket.component.css']
})
export class ConsultarTicketComponent implements OnInit{
  dialog: any;
  devolucion: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConsultarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginServiceService
  ) {
    if (data.devolucion === 1) {
      this.devolucion = true;
    }

  }

  ngOnInit(): void {
    this.obtenerTodosTicket();
  }



  consultarTicket: boolean = false;


  ticketBD: Ticket[] = [];
  ticketBusqueda: Ticket[] = [];
  ticketActualDevolucion: ProductoTicket = new ProductoTicket();
  ticketActual: Ticket = new Ticket();
  nombreTicketSeleccionado!: string;
  productosTicketSeleccionado!: Productos;
  refTicket!: string;
  buscar: boolean = false;
  cestaDevolucion: Producto[] = [];


  seleccionarTicket(Ticket: Ticket) {
    this.ticketActual = Ticket;
    this.consultarTicket = true;
    console.log(this.ticketActual.cliente);
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

  buscarTicket() {
    this.loginService.buscarTicket(this.refTicket)
      .subscribe(tickets => {
        console.log(tickets);

        this.ticketBusqueda = tickets;
        this.buscar = true;
      }, error => {
        this.buscar = false;
      });
  }


  devolverProducto(producto: any) {
    this.cestaDevolucion.push(producto);
    console.log(this.cestaDevolucion);
  }

  retirarProducto(producto: any) {
    const indice = this.cestaDevolucion.indexOf(producto);
    if (indice !== -1) {
      this.cestaDevolucion.splice(indice, 1);
    }

  }



  estaEnCesta(prS: any): boolean {
    return this.cestaDevolucion.some(item => item.referencia === prS.producto.referencia);

  }






  botonVolver() {
    this.consultarTicket = false;
    this.cestaDevolucion = [];
  }


  finalizarDevolucion() {
    this.dialogRef.close({
      devolucion: true,
      metodoPago: this.ticketActual.metodoPago,
      clienteActual: this.ticketActual.cliente,
      cesta: this.cestaDevolucion,
      numeroTicket: this.ticketActual.referencia
    });

  }
}
