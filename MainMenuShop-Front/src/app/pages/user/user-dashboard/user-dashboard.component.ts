import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Cliente';
import { Productos } from 'src/app/Productos';
import { LoginService } from 'src/app/services/login.service';
import { debounceTime } from 'rxjs/operators';


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
  formularioPanelCobro = false;
  formularioDevolucionDineroEfectivo = false;


  productos: Productos[] = [];
  clientes: Cliente[] = [];
  cesta: any[] = [];
  conjuntoDeCestas: any[][] = [];

  terminoBusqueda!: string;
  terminoBusquedaCliente!: string;
  cantidadUnidades: any = 1;

  resultados!: any[];
  resultadosCliente!: any[];

  productoActual: any;
  clienteActual: any;

  inputCliente!:any;



  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.loginService.getCurrentUser().subscribe(data => {
      this.usuarioActual = data;
    });
      this.obtenerProductos();
     this.obtenerClientes();
  }

  private obtenerProductos(){
    this.loginService.obtenerTodosLosProductos().subscribe(
      (productos: Productos[]) => {
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

  aniadircesta(resultado: any) {
    for (let i = 0; i < this.cantidadUnidades; i++) {
      this.cesta.push(resultado);
    }
    this.resultados = [];
    this.productoActual = null;
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
    this.cesta = [];
    this.clienteActual = [];
    this.terminoBusqueda = '';
    this.terminoBusquedaCliente = '';
    this.formularioPanelCobro = false;
  }

  terminarCompraEfectivo(){
    this.formularioDevolucionDineroEfectivo = true;
    this.formularioPanelCobro = false;
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
  mostrarPanelCobro(){this.formularioPanelCobro = true;}
  ocultarPanelCobro(){this.formularioPanelCobro = false;}
  mostrarDevolucionDineroEfectivo(){this.formularioDevolucionDineroEfectivo = true;}
  ocultarDevolcionDineroEfectivo(){this.formularioDevolucionDineroEfectivo = false;}

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
  }
}
