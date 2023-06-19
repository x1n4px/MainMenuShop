import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';
import { BusquedaArticulosComponent } from '../../modal/busqueda-articulos/busqueda-articulos.component';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gato',
  templateUrl: './gato.component.html',
  styleUrls: ['./gato.component.css']
})
export class GatoComponent implements OnInit {

  datosCompletos: Producto[] = [];

  cantidadMostrada:number = 6;
  cantidadPorCargar = 4;
  alturaContenedor = 1300;
  seleccionados: any[] = [];
  selecciones: any[] = [];
  datosFiltradosResV: Producto[] = [];


  constructor(private sharedService: SharedServiceService, private productoService: ProductosService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar, private changeDetectorRef: ChangeDetectorRef, private router: Router) {

  }


  ngOnInit(): void {
    this.obtenerProductos(this.cantidadMostrada);
    this.activatedRoute.queryParams.subscribe(params => {
      const dato = params['dato'];

      if (dato) {
        this.marcarElemento(dato);
      }
    });
  }

  obtenerProductos(cantidadMostrada:number) {
    this.productoService.obtenerTodosLosProductos(cantidadMostrada, 'gato').subscribe(
      (productos: Producto[]) => {
        this.datosCompletos = productos;
        this.datosFiltradosResV = productos;
        console.log(this.datosFiltradosResV);
      }
    );
  }





  expandirItem(item: any): void {
    item.expandido = !item.expandido;

  }

  activarCheckbox(event: Event) {
    event.stopPropagation();
    // Realiza aquí la lógica para activar/desactivar el checkbox
  }
  cantidadCargada: number = this.cantidadMostrada;
  cargarMas(): void {

    this.cantidadMostrada += this.cantidadPorCargar;
    this.obtenerProductos(this.cantidadMostrada);
    this.calcularAlturaContenedor();

  }

  estaSeleccionado(dato: any): boolean {
    return this.seleccionados.includes(dato);
  }

  marcarElemento(dato: any) {

    if (this.estaSeleccionado(dato)) {
      this.seleccionados = this.seleccionados.filter((elem) => elem !== dato);
      this.datosFiltradosRes();

    } else {
      dato
      this.seleccionados.push(dato);
      this.datosFiltradosRes();

    }
  }


  calcularAlturaContenedor(): void {
    const cantidadTarjetas = Math.min(this.cantidadMostrada, this.datosFiltradosRes.length);
    const cantidadFilas = Math.ceil(cantidadTarjetas / 3);
    this.alturaContenedor = cantidadFilas * 450;
  }

  openModalFiltrar() {
    console.log(this.seleccionados);
    const dialogRef = this.dialog.open(BusquedaArticulosComponent, { data: { seleccionados: this.seleccionados } });
    dialogRef.afterClosed().subscribe(result => {
      this.selecciones = result.selecciones;

      if (this.selecciones !== undefined) {
        this.datosFiltradosRes();
      }
    });
  }



  datosFiltradosRes() {

    // this.datosFiltradosResV = [];
    console.log(this.datosCompletos);
    this.datosFiltradosResV = this.datosCompletos.filter(item => {
      return this.selecciones.every(seleccion => {
        const titulo = seleccion.titulo.toLowerCase();
        const datos = seleccion.datos.map((dato: string) => dato.toLowerCase());
        return datos.includes(item[titulo as keyof Producto]?.toString().toLowerCase());
      });
    });





  }


  limpiarFiltros() {
    this.seleccionados = [];
    this.datosFiltradosResV = this.datosCompletos;
  }

  addToCesta(producto: any) {
    this.sharedService.aniadirProductoCesta(producto);
  }

  verDetallesProducto(dato: any) {
    const tituloProducto = dato.nombre;
    const id = dato.id;
     this.router.navigate(['producto/',id, tituloProducto]);
  }


}
