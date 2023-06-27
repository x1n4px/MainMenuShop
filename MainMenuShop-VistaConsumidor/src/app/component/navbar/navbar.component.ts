import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from 'src/app/service/productos.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ProductoFComponent } from '../modal/producto-f/producto-f.component';
import { Producto } from 'src/app/class/producto';
import { EventServiceService } from 'src/app/service/event-service.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cesta: any[];
  cestaVacia: boolean = true;
  resultados: any[] = [];
  terminoBusqueda!: string;
  mostrarResultados: boolean = false;
  loginCheck: boolean = false;
  showMenu: boolean = false;
  isHome: boolean = false;

  constructor(private productooService: ProductosService, private sharedService: SharedServiceService, private router: Router,
    public dialog: MatDialog, private snack: MatSnackBar, private eventService: EventServiceService,
    private usuario: UsuarioService) {
    this.cesta = this.sharedService.obtenercesta();
    this.isHome = this.router.url === '';
    console.log(this.cesta.length);
  }

  ngOnInit(): void {
    this.eventService.cestaActualizada$.subscribe(() => {
      // Actualizar el estado de cestaVacia según la lógica de tu aplicación
      this.cestaVacia = this.cesta.length === 0;

      // Realizar la animación en el icono de la cesta
      const iconoCesta = document.getElementById('icono-cesta');
      iconoCesta?.classList.add('animacion-cesta');
      setTimeout(() => {
        iconoCesta?.classList.remove('animacion-cesta');
      }, 2000);
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  selectedInfo: string = '';
  selectedIndex: number = 0;

  selectItem(index: number) {
    const infoArray = ['Información sobre perros', 'Información sobre gatos', 'Información sobre pájaros', 'Información sobre reptiles', 'Información sobre roedores', 'Información sobre peces'];

    this.selectedIndex = index;
    this.selectedInfo = infoArray[index];
  }


  navegarAPerro(route: any): void {
    const dato = route;

    // Navegar a la página Perro y pasar el dato como parámetro en la URL
    this.router.navigate(['/perro'], { queryParams: { dato } });
  }

  isCardOpen: boolean = false;
  mostrar: boolean = false;
  precioCesta: number = 0;
  mostrarCesta() {
    this.mostrar = !this.mostrar;
    this.calcularCesta()
  }
  mostrarlogin: boolean = false;
  mostrarperfil() {
    this.mostrarlogin = !this.mostrarlogin;

  }

  calcularCesta() {
    this.precioCesta = 0;
    for (let i = 0; i < this.cesta.length; i++) {
      this.precioCesta += (this.cesta[i].precioNeto) + (this.cesta[i].precioNeto * (this.cesta[i].ivaAsociado / 100));
    }
  }


  irA(ruta: any) {
    this.router.navigate([ruta]);
    const checkbox = document.getElementById('nav-check') as HTMLInputElement;
    checkbox.checked = false;


  }


  buscar() {
    console.log(this.terminoBusqueda);
    this.productooService.buscarProducto(this.terminoBusqueda)
      .subscribe(productos => {
        this.resultados = productos;
        console.log(this.resultados);
        this.showMenu = true;
        this.selectItem(7);
      }, error => {
        this.resultados = [];
      });
  }


  verDetallesProducto(dato: Producto) {
    console.log(dato);
    const dialogRef = this.dialog.open(ProductoFComponent, { data: { product: dato } });
    this.resultados = [];
  }

  seleccionarResultado(dato: any) {

    this.router.navigate(['perro']);
  }


  go(route: string) {
    this.showMenu = !this.showMenu;
    this.router.navigate(['', route]);
  }


  cerrarsesion() {
    this.usuario.logout();
    this.loginCheck = false;
  }
}
