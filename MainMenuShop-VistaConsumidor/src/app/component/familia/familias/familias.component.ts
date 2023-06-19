import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BusquedaArticulosComponent } from '../../modal/busqueda-articulos/busqueda-articulos.component';
import { Producto } from 'src/app/class/producto';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from 'src/app/service/productos.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.css']
})
export class FamiliasComponent implements OnInit, OnDestroy {


  constructor(private sharedService: SharedServiceService, private productoService: ProductosService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar, private changeDetectorRef: ChangeDetectorRef, private router: Router) {

  }


  private unsubscribe$ = new Subject();

  familia!: string;
  familiaAnterior!: string;
  datosCompletos: Producto[] = [];

  cantidadMostrada: number = 6;
  cantidadPorCargar = 4;
  alturaContenedor = 1300;
  seleccionados: any[] = [];
  selecciones: any[] = [];
  datosFiltradosResV: Producto[] = [];



  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.activatedRoute.params.subscribe(params => {
          this.familia = params['familia'];
        });
        if (this.familia !== this.familiaAnterior) {
          this.limpiar();
        }
        this.obtenerProductos(this.cantidadMostrada);
      });


    this.activatedRoute.queryParams.subscribe(params => {
      const dato = params['dato'];
      if (dato) {
        this.marcarElemento(dato);
      }
    });
     if(this.familia === undefined){
      const uri = this.router.url;
      const partes = uri.split('/');
      const segmentoDeseado = partes[partes.length - 1];
      console.log(segmentoDeseado);

      this.familia = segmentoDeseado;
      this.obtenerProductos(this.cantidadMostrada);
      console.log(this.familia);
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }


  obtenerProductos(cantidadMostrada: number) {
    this.familiaAnterior = this.familia;
    console.log(this.cantidadMostrada);
    this.productoService.obtenerTodosLosProductos(cantidadMostrada, this.familia).subscribe(
      (productos: Producto[]) => {
        this.datosCompletos = productos;
        this.datosFiltradosResV = productos;
        console.log(this.datosFiltradosResV);
      }, (error) => {
        this.datosCompletos = [];
        this.datosFiltradosResV = [];
      }
    );
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
      this.seleccionados.push(dato);
      this.datosFiltradosRes();

    }
  }



  calcularAlturaContenedor(): void {
    const cantidadTarjetas = Math.min(this.cantidadMostrada, this.datosCompletos.length);
    const cantidadFilas = Math.ceil(cantidadTarjetas / 3);
    this.alturaContenedor = cantidadFilas * 500;
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
    this.router.navigate(['producto/', id, tituloProducto]);
  }

  limpiar() {
    this.cantidadMostrada = 6;
    this.alturaContenedor = 1300;
    this.limpiarFiltros();
  }
}
