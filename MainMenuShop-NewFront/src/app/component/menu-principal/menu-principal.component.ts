import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/class/cliente';
import { Producto } from 'src/app/class/producto';
import { LoginServiceService } from 'src/app/login-service.service';
import { Ticket } from 'src/app/class/ticket';
import { AvisoClienteComponent } from '../../modals/aviso-cliente/aviso-cliente.component';
import { CierreCajaComponent } from '../../modals/cierre-caja/cierre-caja.component';
import { ConsultarTicketComponent } from '../../modals/consultar-ticket/consultar-ticket.component';
import { DatosArticuloComponent } from '../../modals/datos-articulo/datos-articulo.component';
import { DatosClienteComponent } from '../../modals/datos-cliente/datos-cliente.component';
import { PagoComponent } from '../../modals/pago/pago.component';
import { RecuperarTicketComponent } from '../../modals/recuperar-ticket/recuperar-ticket.component';
import { debounceTime } from 'rxjs';
import { Productos } from 'src/app/class/productos';
import { CalculadoraComponent } from '../../modals/calculadora/calculadora.component';
import { ImporteDiaComponent } from 'src/app/modals/importe-dia/importe-dia.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  constructor(private route: Router, private loginService: LoginServiceService, public dialog: MatDialog) { }


  usuarioActual: any;
  rolAsignado!: string;
  isLoggedIn = false;
  subtotal: number = 0;

  /*
  conjuntoObjetos: any = {
     valor1: 'Objeto 1' ,
     valor2: 'Objeto 2' ,
     valor3: 'Objeto 3' ,
    // Agrega más objetos según sea necesario
  };*/
  //  metodoPago!: string;
  metodoPago: any;

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
  clienteActual: any;
  ticketActual: Ticket = new Ticket();

  busqueda: boolean = false;

  nombre: any;
  devuelve: any;

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.usuarioActual = data;
    })
  }

  cambiarBusqueda() {
    this.busqueda = !this.busqueda;
  }

  openDialog() {
    const dialogRef = this.dialog.open(RecuperarTicketComponent, { data: { conjuntoDeCestas: this.conjuntoDeCestas } });
    dialogRef.afterClosed().subscribe(result => {
      this.recuperarTicket(result);
    });
  }

  openDialogContarDinero() {
    const dialogRef = this.dialog.open(ImporteDiaComponent, {});

  }

  openCalculator() {
    const dialogRef = this.dialog.open(CalculadoraComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  referenciaDevolucion: string = "";
  openDialogConsultarTicket(devuelve: any) {
    const dialogRef = this.dialog.open(ConsultarTicketComponent, { data: { devolucion: devuelve } });


    dialogRef.afterClosed().subscribe(result => {
      if (result?.devolucion) {
        this.metodoPago = result.metodoPago;
        this.clienteActual = result.clienteActual;
        this.cesta = result.cesta;
        this.devuelve = true;
        this.referenciaDevolucion = result.numeroTicket;
        console.log(this.referenciaDevolucion);
        console.log(result.metodoPago);
        if (this.metodoPago === 'tarjeta') {
          this.terminarCompraTarjeta();
        } else {
          this.terminarCompraEfectivo();
        }


      }

    });
  }


  openDialogDatosCliente(edita: any) {
    const dialogRef = this.dialog.open(DatosClienteComponent, { data: { clienteActual: this.clienteActual, editable: edita } });
    if (edita == 1) {
      dialogRef.afterClosed().subscribe(result => {
        this.nuevoCliente = result.nuevoCliente;
        this.crearCliente();
      });
    }


  }



  openDialogAvisoCliente() {
    const dialogRef = this.dialog.open(AvisoClienteComponent, { data: { clienteActual: this.clienteActual } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      } else {
        console.log(`Diálogo cerrado sin cambios`);
      }
    });
  }

  openDialogDatosProducto() {
    const dialogRef = this.dialog.open(DatosArticuloComponent, { data: { productoActual: this.productoActual } });
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
      this.ivaAplicado = result.ivaAplicado;
      if (metodoPago === 0) {
        this.terminarCompraEfectivo();
      } else if (metodoPago === 1) {
        this.terminarCompraTarjeta();
      }
    });
    this.subtotal = 0;
  }

  openDialogCierreCaja(n: number) {
    const dialogRef = this.dialog.open(CierreCajaComponent, {
      data: {
        usuarioActual: this.usuarioActual,
        numero: n
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









  buscar() {
    /*
        if (this.terminoBusqueda && this.terminoBusqueda.trim()) {
          const termino = this.terminoBusqueda.toLowerCase();
          this.resultados = this.productos.filter(producto => {
            const nombreD = producto.nombre.toLowerCase();
            const referencia = producto.referencia.toLowerCase();
            return nombreD.includes(termino) || referencia.includes(termino);
          });
        } else {
          this.resultados = [];
        }*/


    this.loginService.buscarProducto(this.terminoBusqueda)
      .subscribe(productos => {
        this.resultados = productos;
      }, error => {
        this.resultados = [];
      });
  }

  buscarCliente() {
    /*if (this.terminoBusquedaCliente && this.terminoBusquedaCliente.trim()) {
      const termino = this.terminoBusquedaCliente.toLowerCase();
      this.resultadosCliente = this.clientes.filter(cliente => {
        const nombreC = cliente.nombre.toLowerCase();
        const id = cliente.id;
        return nombreC.includes(termino);
      });
    } else {
      this.resultadosCliente = [];
    }*/

    this.loginService.buscarCliente(this.terminoBusquedaCliente)
      .subscribe(clientes => {
        this.resultadosCliente = clientes;
      }, (error) => {
        this.resultadosCliente = [];
      })
  }




  seleccionarProducto(resultado: any) {
    this.productoActual = resultado;
    this.terminoBusqueda = '';
  }

  seleccionarCliente(resultado: any) {
    this.clienteActual = resultado;
    if (this.clienteActual.rol === 'EMPLEADO') {
      this.openDialogAvisoCliente();
    }
    this.cambiarBusqueda();
    this.resultadosCliente = [];
    this.terminoBusquedaCliente = '';
  }

  nombreTicketSeleccionado!: string;
  productosTicketSeleccionado!: Productos;
  productoProductos!: Producto[];

  seleccionarTicket(ticketX: any) {
    this.ticketActual = ticketX;

    this.nombreTicketSeleccionado = ticketX.cliente.nombre + ' ' + ticketX.cliente.apellido1 + ' ' + ticketX.cliente.apellido2;
    this.productosTicketSeleccionado = ticketX.productos;

  }



  aniadircesta(resultado: any) {
    console.log(resultado);
    for (let i = 0; i < this.cantidadUnidades; i++) {
      this.cesta.push(resultado);
      this.calcularSubtotal();
    }
    this.cantidadUnidades = 1;
    this.resultados = [];
    this.productoActual = null;
  }

  calcularSubtotal() {
    this.subtotal = 0;
    for (let i = 0; i < this.cesta.length; i++) {
      this.subtotal += (this.cesta[i].precioNeto + this.cesta[i].precioNeto * (this.cesta[i].ivaAsociado / 100));
      console.log(this.subtotal);
    }

  }

  eliminarDeCesta(producto: Producto) {
    const indice = this.cesta.indexOf(producto);
    this.cesta.splice(indice, 1);
  }



  aparcarCesta() {
    const nombreCesta = this.clienteActual;
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




  vaciarCestaCompleta() {
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
  }
  terminarCompraTarjeta() {
    this.guardarTicket('Tarjeta');

  }

  terminarCompraEfectivo() {
    this.guardarTicket('Efectivo');
    if (!this.devuelve) {
      this.devolucionEfectivo();
    }

  }

  borrarArticulo() {
    this.productoActual = null;
  }

  borrarCliente() { this.clienteActual = null; }


  funcionParaAdmin() {
    this.route.navigate(['admin']);

  }


  public logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.route.navigate(['']);
  }



  total!: number;
  dineroEfectivo!: number;
  ivaAplicado!: number;
  sumaPrecios!: number;
  totalCesta() {

    for (let i = 0; i < this.cesta.length; i++) {
      this.sumaPrecios += this.cesta[i].precioNeto;
      this.ivaAplicado += (this.cesta[i].precioNeto * this.cesta[i].ivaAsociado / 100);
    }
    this.total = parseFloat(this.sumaPrecios.toFixed(2) + this.ivaAplicado.toFixed(2));
    console.log(this.sumaPrecios);
    console.log(this.ivaAplicado);
    console.log(this.total);
  }

  DineroDevolver!: number;
  devolucionEfectivo() {
    let diferencia = 0;
    diferencia = this.dineroEfectivo - this.total;
    this.DineroDevolver = parseFloat(diferencia.toFixed(2));
    this.dineroEfectivo = 0;
  }

  puntosClienteActualizado: number = 0;
  guardarTicket(metodoPago: string): void {
    // Creamos el objeto ticket con la información del cliente, fecha, hora y cesta
    const tienda = {
      id: 3,
      nombre: "tienda",
      apellido1: "Mijas"
    }
    let referencia;
    if (!this.devuelve) {
      referencia = "E" + this.generarNumeros();
    } else {
      referencia = this.referenciaDevolucion.replace('E', 'D');
      this.devuelve = false;
    }
    let importeBase = this.total - this.ivaAplicado;
    const ticket = {
      referencia: referencia,
      cliente: this.clienteActual,
      vendedor: this.usuarioActual.nombre + ' ' + this.usuarioActual.apellido1 + '.' + this.usuarioActual.apellido2,
      productos: this.cesta.map((producto) => ({ cantidad: 1, producto: producto })),
      fecha: new Date(),
      hora: this.obtenerHoraActual(),
      metodoPago: metodoPago,
      importeTotal: this.total,
      importeBase: (this.total - this.ivaAplicado).toFixed(2)
    };
    // Agregamos el ticket al arreglo de tickets
    this.puntosClienteActualizado = this.clienteActual.puntos + (this.total / 100);

    this.tickets.push(ticket);

    this.loginService.enviarTicket(ticket).subscribe(
      respuesta => {

      },
      error => {
        console.error('Error al enviar el ticket al backend');
      }
    );
    this.actualizarPuntosCliente();

    this.clienteActual = null;
    this.cesta = [];
    this.metodoPago = "";
    this.busqueda = false;
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

  actualizarPuntosCliente(){
    this.loginService.actualizarPuntosCliente(this.clienteActual.id, this.puntosClienteActualizado).subscribe(
      (response) => {
        console.log(response);
        this.puntosClienteActualizado = 0;
      },
      (error) => {
        console.log(error);
        // hacer algo en caso de error
      }
    );

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
      valecliente: this.clienteActual.valecliente,
      puntos: this.puntosClienteActualizado
    };
    this.loginService.actualizarCliente(cliente.id, cliente).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        // hacer algo en caso de error
      }
    );
  }

  nuevoCliente: Cliente = new Cliente;
  crearCliente() {
    console.log(this.nuevoCliente);
    this.loginService.crearCliente(this.nuevoCliente).subscribe(
      data => {
        alert('Cliente creado correctamente');
      },
      error => {
        console.log(error);
        alert('Ha ocurrido un error al crear el cliente');
      });
  }

  generatePDF() {
    const documentDefinition = {
      content: [
        { text: 'Tienda XYZ', style: 'header' },
        { text: `Fecha: ${new Date().toLocaleDateString()}`, style: 'subheader' },
        { text: `Hora: ${this.obtenerHoraActual()}`, style: 'subheader' },
        { text: `Vendedor: ${this.usuarioActual.nombre}`, style: 'subheader' },
        { text: 'Productos', style: 'subheader' },
        {
          ul: this.cesta.map((producto) =>
            `${producto.nombre} - ${producto.precioNeto}`
          )
        },
        { text: `Importe Total: ${this.total}`, style: 'subheader' },
        { text: `IVA: ${(this.total - this.ivaAplicado).toFixed(2)}`, style: 'subheader' },
        { text: `Método de Pago: ${this.metodoPago}`, style: 'subheader' }
      ]
    };



    const pdf = pdfMake.createPdf(documentDefinition);
    pdf.open(); // Abre el PDF en una nueva pestaña del navegador
  }

}
