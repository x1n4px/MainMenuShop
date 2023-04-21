import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Productos } from 'src/app/ Productos';
 import { Cliente } from 'src/app/Cliente';
import {   Producto } from 'src/app/Producto';
import { LoginService } from 'src/app/services/login.service';
 import { Ticket } from 'src/app/Ticket';
import { AvisoClienteComponent } from '../../dialogs/aviso-cliente/aviso-cliente.component';
import { CierreCajaComponent } from '../../dialogs/cierre-caja/cierre-caja.component';
import { ConsultarTicketComponent } from '../../dialogs/consultar-ticket/consultar-ticket.component';
import { DatosArticuloComponent } from '../../dialogs/datos-articulo/datos-articulo.component';
import { DatosClienteComponent } from '../../dialogs/datos-cliente/datos-cliente.component';
import { PagoComponent } from '../../dialogs/pago/pago.component';
import { RecuperarTicketComponent } from '../../dialogs/recuperar-ticket/recuperar-ticket.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  usuarioActual: any;
  rolAsignado!: string;
  constructor(private route: Router, private loginService:LoginService, public dialog: MatDialog) { }
  isLoggedIn = false;
   formularioDevolverTicket = false;
   formularioCierreCaja = false;
    formularioCrearcliente = false;
    formularioDevolucionDineroEfectivo = false;
  formularioDevolucionDineroTarjeta = false;
  pagoEfectivo = false;
  compraEfectiva = false;
  compraTarjeta = false;
  datosTicket = false;
  promociones: boolean = false;

  productos: Producto[] = [];
  clientes: Cliente[] = [];
  ticketBD: Ticket[] = [];
  cesta: Producto[] = [];
  conjuntoDeCestas: any[][] = [];

  tickets: any[] = [];

  terminoBusqueda!: string;
  terminoBusquedaCliente!: string;
  cantidadUnidades: any = 1;

  resultados!: any[];
  resultadosCliente!: any[];

  productoActual: any;
  clienteActual: any ;
  ticketActual: Ticket = new Ticket();

  inputCliente!:any;
  fechaActual!: Date;
  horaActual!: string;
  busqueda:boolean = false;

  nombre: any;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.loginService.getCurrentUser().subscribe(data => {
      this.usuarioActual = data;
    });
       this.obtenerProductos();
     this.obtenerClientes();
     this.fechaActual = new Date();
    this.horaActual = this.obtenerHoraActual();
    this.obtenerTodosTicket();
  }

  cambiarBusqueda(){
    this.busqueda =!this.busqueda;
  }

  openDialog() {
    const dialogRef = this.dialog.open(RecuperarTicketComponent, {data:{conjuntoDeCestas: this.conjuntoDeCestas}});
     dialogRef.afterClosed().subscribe(result => {
       this.recuperarTicket(result);
    });
  }

  openDialogConsultarTicket(){
    const dialogRef = this.dialog.open(ConsultarTicketComponent, {data:{ticketBD: this.ticketBD}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
   openDialogDatosCliente(edita: any){
    const dialogRef = this.dialog.open(DatosClienteComponent, {data:{clienteActual: this.clienteActual, editable:edita}});
    if(edita == 1){
      dialogRef.afterClosed().subscribe(result => {
        this.nuevoCliente=result.nuevoCliente;
        this.crearCliente();
      });
    }


  }



  openDialogAvisoCliente( ){
    const dialogRef = this.dialog.open(AvisoClienteComponent, {data:{clienteActual: this.clienteActual }});
     dialogRef.afterClosed().subscribe(result => {
      if (result) {

      } else {
        console.log(`Diálogo cerrado sin cambios`);
      }
     });
  }

  openDialogDatosProducto( ){
    const dialogRef = this.dialog.open(DatosArticuloComponent, {data:{productoActual: this.productoActual }});
     dialogRef.afterClosed().subscribe(result => {

     });
  }

  openDialogPago() {
    const dialogRef = this.dialog.open(PagoComponent, {
      data: {
        clienteActual: this.clienteActual,
        cesta: this.cesta
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.total = result.total;
      const metodoPago = result.metodoPago;
      if(metodoPago === 0){
        this.terminarCompraEfectivo();
      }else if(metodoPago === 1){
        this.terminarCompraTarjeta();
      }
    });
  }

  openDialogCierreCaja(n:number){
    const dialogRef = this.dialog.open(CierreCajaComponent, {
      data: {
        usuarioActual:this.usuarioActual,
        numero:n
      }
    });
  }



  obtenerHoraActual(): string {
    // Obtenemos la hora actual en formato HH:mm:ss
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }

  private obtenerProductos(){
    this.loginService.obtenerTodosLosProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
      },
      (error) => {
        console.log(error);
      }

    );
  }

  private obtenerClientes(){
    this.loginService.obtenerTodosLosClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error) => {
        console.log(error);
      }

    );
  }

  obtenerTodosTicket(){
       this.loginService.obtenerTodosLosTicket().subscribe(
        (ticketBD: Ticket[]) => {
          this.ticketBD = ticketBD;
        },
        (error) => {
          console.log(error);
        }

      );

  }




  buscar() {

    if (this.terminoBusqueda && this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase();
      this.resultados = this.productos.filter(producto => {
        const nombreD = producto.nombre.toLowerCase();
        const referencia = producto.referencia.toLowerCase();
        return nombreD.includes(termino) || referencia.includes(termino);
      });
    } else {
      this.resultados = [];
    }

    /*
    this.loginService.buscarProducto(this.terminoBusqueda)
    .pipe(debounceTime(500)) // espera 500 ms antes de enviar la solicitud
    .subscribe(productos => {
      this.productos = productos;
    }, error => {
      console.error(error);
    });*/
  }

  buscarCliente(){
    if (this.terminoBusquedaCliente && this.terminoBusquedaCliente.trim()) {
      const termino = this.terminoBusquedaCliente.toLowerCase();
      this.resultadosCliente = this.clientes.filter(cliente => {
        const nombreC = cliente.nombre.toLowerCase();
        const id = cliente.id;
        return nombreC.includes(termino)   ;
      });
    } else {
      this.resultadosCliente = [];
    }
  }




  seleccionarProducto(resultado: any) {
    this.productoActual = resultado;
    this.terminoBusqueda = '';
  }

  seleccionarCliente(resultado:any){
    this.clienteActual = resultado;
    if(this.clienteActual.rol === 'EMPLEADO'){
      this.openDialogAvisoCliente();
    }
    this.resultadosCliente = [];
    this.terminoBusquedaCliente = '';
  }

  nombreTicketSeleccionado!:string;
  productosTicketSeleccionado!:Productos;
  productoProductos!:Producto[];

  seleccionarTicket(ticketX:any){
    this.ticketActual = ticketX;

    this.nombreTicketSeleccionado = ticketX.cliente.nombre + ' ' + ticketX.cliente.apellido1 + ' ' + ticketX.cliente.apellido2;
    this.productosTicketSeleccionado = ticketX.productos;

     this.mostrarDatosTicket();
  }



  aniadircesta(resultado: any ) {

    for (let i = 0; i < this.cantidadUnidades; i++) {
      this.cesta.push(resultado);
    }
    this.resultados = [];
    this.productoActual = null;
  }

  eliminarDeCesta(producto: Producto) {
    const indice = this.cesta.indexOf(producto);
    this.cesta.splice(indice, 1);
  }



  aparcarCesta() {
    const nombreCesta = this.clienteActual ;
    const cestaConNombre = [nombreCesta, ...this.cesta];
    this.conjuntoDeCestas.push(cestaConNombre);
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusquedaCliente = '';
    this.terminoBusqueda = '';
    this.borrarCliente();
  }

  recuperarTicket(cesta: any) {

    this.clienteActual = cesta[0];
    this.cesta = cesta.slice(1);
     const index = this.conjuntoDeCestas.indexOf(cesta);
    if (index > -1) {
      this.conjuntoDeCestas.splice(index, 1);
    }
  }




  vaciarCestaCompleta(){
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
   }
  metodoPago!:string;
  terminarCompraTarjeta(){
    this.metodoPago = "tarjeta"
    this.guardarTicket(this.metodoPago);
    this.cesta = [];
    this.clienteActual = [];
     this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
   }

  terminarCompraEfectivo(){
    this.metodoPago  = "efectivo";
    this.guardarTicket(this.metodoPago);
    this.devolucionEfectivo();
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
   }

  borrarArticulo(){
    this.productoActual = null;
  }

  borrarCliente(){this.clienteActual = null;}


  funcionParaAdmin(){
    this.route.navigate(['admin']);

  }


  public logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.route.navigate(['']);
  }


  mostrarDevolverTicket(){this.formularioDevolverTicket = true;}
  ocultarDevolverTicket(){this.formularioDevolverTicket = false;}

  mostrarCierreCaja(){this.formularioCierreCaja = true;}
  ocultarCierreCaja(){this.formularioCierreCaja=false;}

  mostrarDevolucionDineroEfectivo(){this.formularioDevolucionDineroEfectivo = true;}
  ocultarDevolcionDineroEfectivo(){this.formularioDevolucionDineroEfectivo = false;}
  mostrarCrearCliente(){this.formularioCrearcliente = true;}
  ocultarCrearCliente(){this.formularioCrearcliente = false;}
  mostrarDatosTicket(){this.datosTicket = true;}
  ocultarDatosTicket(){this.datosTicket = false;}

  total!:number;
  dineroEfectivo!:number;
  totalCesta(){
    let sumaPrecios = 0;
    for(let i = 0; i < this.cesta.length; i++){
      sumaPrecios += this.cesta[i].precio;
    }
    this.total = parseFloat(sumaPrecios.toFixed(2));
  }

  DineroDevolver!:number;
  devolucionEfectivo(){
    let diferencia = 0;
    diferencia =  this.dineroEfectivo - this.total;
    this.DineroDevolver = parseFloat(diferencia.toFixed(2));
    this.dineroEfectivo = 0;
  }


  guardarTicket(metodoPago: string): void {
    // Creamos el objeto ticket con la información del cliente, fecha, hora y cesta
    const tienda = {
      id: 3,
      nombre: "tienda",
      apellido1: "Mijas"
    }

    const ticket = {
      referencia: "E"+this.generarNumeros(),
      cliente : this.clienteActual ,
      vendedor: this.usuarioActual.nombre+' '+this.usuarioActual.apellido.split(' ')[0].charAt(0)+'.'+this.usuarioActual.apellido.split(' ')[1].charAt(0),
      productos: this.cesta.map((producto) => ({ cantidad: 1, producto: producto })),
      fecha: this.fechaActual,
      hora: this.horaActual,
      metodoPago: metodoPago
    };

    // Agregamos el ticket al arreglo de tickets
    this.tickets.push(ticket);

    // Limpiamos la cesta y el cliente actual para preparar para un nuevo ticket
    this.cesta = [];
    this.clienteActual = null;
    this.metodoPago = "";
    // Mostramos los tickets almacenados en la consola


     this.loginService.enviarTicket(ticket).subscribe(
      respuesta => {
        console.log('Ticket enviado al backend');
        console.log(respuesta);
      },
      error => {
        console.error('Error al enviar el ticket al backend');
        console.error(error);
      }
    );



  }

  // obtén el último valor generado del almacenamiento local o inicializa a 0 si no existe
  contador: number = parseInt(localStorage.getItem('ultimo_valor_generado') || '0');
   generarNumeros(): string {
    this.contador++;
    const numero = `111111${this.contador.toString().padStart(6, '0')}`;
    // guarda el último valor generado en el almacenamiento local
    localStorage.setItem('ultimo_valor_generado', this.contador.toString());
    return numero;
  }





   calcularImporteTotal(cesta: any[]): number {
    let total = 0;
    for (const producto of cesta) {
      total += producto.precio;
    }

    return parseFloat(total.toFixed(2));
  }

  guardarModificacionCliente() {
    const cliente: Cliente = {
      id: this.clienteActual.id,
      nombre: this.clienteActual.nombre,
      apellido1: this.clienteActual.apellido1,
      apellido2: this.clienteActual.apellido2,
      codigoPostal: this.clienteActual.codigoPostal,
      dni: this.clienteActual.dni,
      email: this.clienteActual.email,
      localidad: this.clienteActual.localidad,
      numeroMovil: this.clienteActual.numeroMovil,
      numeroTelefono: this.clienteActual.numeroTelefono,
      rol: this.clienteActual.rol,
      direccion: this.clienteActual.direccion,
      valecliente:this.clienteActual.valecliente
    };

    this.loginService.actualizarCliente(cliente.id, cliente).subscribe(
      (response) => {
       },
      (error) => {
        console.log(error);
        // hacer algo en caso de error
      }
    );
  }

  nuevoCliente:Cliente = new Cliente;
  crearCliente() {
    this.loginService.crearCliente(this.nuevoCliente).subscribe(
      data => {
        alert('Cliente creado correctamente');
        this.formularioCrearcliente = false;
      },
      error => {
        console.log(error);
        alert('Ha ocurrido un error al crear el cliente');
      });
  }


}
