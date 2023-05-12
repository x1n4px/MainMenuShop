import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/class/ Productos';
import { Producto } from 'src/app/class/Producto';
import { ProductoTicket, TProductos } from 'src/app/class/ProductoTicket';

import { Ticket } from 'src/app/class/Ticket';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-consultar-ticket',
  templateUrl: './consultar-ticket.component.html',
  styleUrls: ['./consultar-ticket.component.css']
})
export class ConsultarTicketComponent implements OnInit {
  dialog: any;
  devolucion: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConsultarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService
  ) {
    if (data.devolucion === 1) {
      this.devolucion = true;
    }
    console.log(this.devolucion);

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
    const productosCopiados: TProductos[] = [];
    this.ticketActual = Ticket;
    this.nombreTicketSeleccionado = Ticket.cliente.nombre + ' ' + Ticket.cliente.apellido1 + ' ' + Ticket.cliente.apellido2;
    this.consultarTicket = true;

    this.ticketActualDevolucion.cliente = Ticket.cliente;
    this.ticketActualDevolucion.fecha = Ticket.fecha;
    this.ticketActualDevolucion.hora = Ticket.hora;
    this.ticketActualDevolucion.id = Ticket.id;
    this.ticketActualDevolucion.metodoPago = Ticket.metodoPago;

    for (const producto of Ticket.productos) {
      const productoCopiado: TProductos = {
        id: producto.id,
        producto: producto.producto,
        cantidad: producto.cantidad,
        devolucion: false
      }
      productosCopiados.push(productoCopiado);

    }

    this.ticketActualDevolucion.productos = productosCopiados;
    console.log(this.ticketActualDevolucion);
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
        this.ticketBusqueda = tickets;
        this.buscar = true;
      }, error => {
        this.buscar = false;
      });
  }


  devolverProducto(producto: any) {
    this.cestaDevolucion.push(producto);
    this.actualizarTicket(producto);
    console.log(this.cestaDevolucion);
  }

  retirarProducto(producto: any) {
    const indice = this.cestaDevolucion.indexOf(producto);
    if (indice !== -1) {
      this.cestaDevolucion.splice(indice, 1);
      this.actualizarTicket(producto);
    }

   }



  estaEnCesta(prS: any): boolean {
    return this.cestaDevolucion.some(item => item.referencia === prS.producto.referencia);

  }

  actualizarTicket(producto: any): any {
    for (const producto of this.ticketActualDevolucion.productos) {
      if (producto.id === producto.producto.id) {
        producto.devolucion = !producto.devolucion;
        break;
      }
    }
  }



  botonVolver() {
    this.consultarTicket = false;
    this.cestaDevolucion = [];
  }


  finalizarDevolucion() {
     this.dialogRef.close({
       metodoPago: this.ticketActualDevolucion.metodoPago,
      clienteActual:this.ticketActualDevolucion.cliente,
      cesta:this.cestaDevolucion
    });

  }
}
