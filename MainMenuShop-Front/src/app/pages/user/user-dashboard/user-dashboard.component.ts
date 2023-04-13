import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/ Productos';
 import { Cliente } from 'src/app/Cliente';
import {   Producto } from 'src/app/Producto';
import { LoginService } from 'src/app/services/login.service';
 import { Ticket } from 'src/app/Ticket';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  usuarioActual: any;
  rolAsignado!: string;
  constructor(private route: Router, private loginService:LoginService) { }
  isLoggedIn = false;
  formularioConsultarTicket = false;
  formularioDevolverTicket = false;
  formularioRecuperarTicket = false;
  formularioCierreCaja = false;
  formularioDatosArticulo = false;
  formularioDatosCliente = false;
  formularioCrearcliente = false;
  formularioModificarcliente = false;
  formularioPanelCobro = false;
  formularioDevolucionDineroEfectivo = false;
  formularioDevolucionDineroTarjeta = false;
  pagoEfectivo = false;
  compraEfectiva = false;
  compraTarjeta = false;
  datosTicket = false;

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
        console.log(productos);
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
        console.log(clientes);
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
          console.log(ticketBD);
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
        const nombre = producto.nombre.toLowerCase();
        const referencia = producto.referencia.toLowerCase();
        return nombre.includes(termino) || referencia.includes(termino);
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
        const nombre = cliente.nombre.toLowerCase();
        const id = cliente.id;
        return nombre.includes(termino)   ;
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



  aniadircesta(resultado: any) {
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
     const nombreCesta = this.clienteActual !== null ? (this.clienteActual.nombre+' '+this.clienteActual.apellido1+' '+this.clienteActual.apellido2) : 'tienda';
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
    this.formularioRecuperarTicket = false;
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
    this.formularioPanelCobro = false;
  }

  terminarCompraTarjeta(){
    this.guardarTicket();
    this.cesta = [];
    this.clienteActual = [];
    this.formularioDevolucionDineroTarjeta = true;
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
    this.formularioPanelCobro = false;
    this.compraTarjeta = false;
  }

  terminarCompraEfectivo(){
    this.guardarTicket();
    this.pagoEfectivo = true;
    this.formularioDevolucionDineroEfectivo = true;
    this.formularioPanelCobro = false;
    this.devolucionEfectivo();
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
    this.compraEfectiva = false;
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

  mostrarConsultarTicket(){ this.formularioConsultarTicket = true;}
  ocultarConsultarTicket(){this.formularioConsultarTicket = false; }
  mostrarDevolverTicket(){this.formularioDevolverTicket = true;}
  ocultarDevolverTicket(){this.formularioDevolverTicket = false;}
  mostrarRecuperarTicket(){this.formularioRecuperarTicket = true; }
  ocultarRecuperarTicket(){this.formularioRecuperarTicket = false;}
  mostrarCierreCaja(){this.formularioCierreCaja = true;}
  ocultarCierreCaja(){this.formularioCierreCaja=false;}
  mostrarDatosArticulo(){this.formularioDatosArticulo = true;}
  ocultarDatosArticulo(){this.formularioDatosArticulo = false;}
  mostrarDatosCliente(){this.formularioDatosCliente = true;}
  ocultarDatosCliente(){this.formularioDatosCliente = false;}
  mostrarModificarCliente(){this.formularioModificarcliente = true;}
  ocultarModificarCliente(){this.formularioModificarcliente = false;}
  mostrarPanelCobro(){this.formularioPanelCobro = true;}
  ocultarPanelCobro(){this.formularioPanelCobro = false; this.compraEfectiva = false; this.compraTarjeta = false;}
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


  guardarTicket(): void {
    // Creamos el objeto ticket con la información del cliente, fecha, hora y cesta
    const tienda = {
      id: 3,
      nombre: "tienda",
      apellido1: "Mijas"
    }

    const ticket = {
      referencia: "E"+this.generarNumeros(),
      cliente : this.clienteActual ? this.clienteActual : tienda,
      vendedor: this.usuarioActual.nombre+' '+this.usuarioActual.apellido.split(' ')[0].charAt(0)+'.'+this.usuarioActual.apellido.split(' ')[1].charAt(0),
      productos: this.cesta.map((producto) => ({ cantidad: 1, producto: producto })),
      fecha: this.fechaActual,
      hora: this.horaActual
    };

    // Agregamos el ticket al arreglo de tickets
    this.tickets.push(ticket);

    // Limpiamos la cesta y el cliente actual para preparar para un nuevo ticket
    this.cesta = [];
    this.clienteActual = null;

    // Mostramos los tickets almacenados en la consola
    console.log(this.tickets);

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
    };

    console.log(cliente.id, cliente);
    this.loginService.actualizarCliente(cliente.id, cliente).subscribe(
      (response) => {
        console.log(response);
        this.formularioModificarcliente = false;
      },
      (error) => {
        console.log(error);
        // hacer algo en caso de error
      }
    );
  }

  nuevoCliente:Cliente = new Cliente;
  crearCliente() {
    console.log(this.nuevoCliente);
    this.loginService.crearCliente(this.nuevoCliente).subscribe(
      data => {
        console.log(data);
        alert('Cliente creado correctamente');
        this.formularioCrearcliente = false;
      },
      error => {
        console.log(error);
        alert('Ha ocurrido un error al crear el cliente');
      });
  }


}
