import { Component, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { BusquedaArticulosComponent } from '../../modal/busqueda-articulos/busqueda-articulos.component';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-perro',
  templateUrl: './perro.component.html',
  styleUrls: ['./perro.component.css']
})
export class PerroComponent implements OnInit {


  items: any[] = [
    {
      titulo: 'MARCA',
      datos: ['2&Snacks', 'AC/DC', 'Acana', 'Adaptil', 'Advance', 'Advantix', 'Adventuros', 'All For Paws', 'Almo Nature', 'Alpha Spirit', 'Arppe', 'Arquivet', 'Artero', 'Banters', 'Baskerville', 'Beaphar', 'Bimar', 'Bio-Groom', 'Bioibérica', 'Bramton', 'Breed Up', 'Brekkies', 'Buddy', 'Calier', 'Camon', 'Cani Amici', 'Canny', 'Capstar', 'Carnilove', 'Cesar', 'Chuckit!', 'Cominter', 'Cosequin', 'Criadores', 'Croci', 'Curver', 'DC', 'Dentalife', 'DentiCan', 'Designed by Lotte', 'Dibaq', 'Dingo', 'Diskount', 'Disney', 'Divasa', 'Dog Chow', 'Dog Gone Smart', 'Dogxtreme', 'Dogzilla', 'Dogzzz', 'Douxo', 'Dr. Dingo', 'Dr. Zoo', 'Dukier', 'Dynavet', 'Earth Rated', 'Edgard &amp; Cooper', 'Envy', 'Era', 'Eukanuba', 'Fatro', 'Ferplast', 'Fish4Dogs', 'Flamingo', 'Flexi', 'Fluffy', 'Forza 10', 'Francodex', 'Freedog', 'Friskies', 'Frontline', 'Frontpro', 'Furminator', 'Genia', 'GimDog', 'Gloria', 'Greenies', 'Guabu', 'Guau Christmas', 'Halti', 'Hansgrohe', 'Happy Dog', 'Healsty', 'Héry', "Hill's", 'Hobbitalf', 'Hunter', 'Iams', 'Imac', 'Innotek', 'Inodorina', 'Julius K9', 'Julius-K9', 'JW', 'Karlie', 'Knot Limit', 'Kong', 'Kumfi', 'Kw', 'Lenda', 'Libra', "Lily's Kitchen", 'Mac Leather', 'Marvel', 'Medicalpet', 'Mediterranean', 'Menforsan', 'Mhims', 'Milord', 'Moderna', 'Moments', 'Moser', 'M-Pets', 'Nath', 'Natura Diet', 'Natural Greatness', 'Natural Trainer', "Nature's Variety", 'Naturea', 'Natureats', 'Naturo', 'Nayeco', 'Neewa', 'Nice Care', 'Nite Ize', 'Nova Clean', 'Novopet', 'Nylabone', 'Ombala', 'Optimanova', 'Orijen', 'Orozyme', 'Oster', 'Otoclean', 'Outech', 'Ownat', 'Pawise', 'Paw Patrol', 'Pawz Dog', 'Pedigree', 'Petmate', 'PetSafe', 'Petstages', 'Pharmadiet', 'PlaqueOff', 'Platinum', 'Play&amp;Bite', 'Play &amp; Bite', 'Plutos', 'Primordial', 'Pro Plan', 'Puppia', 'Purina Beyond', 'Purina One', 'Ribecan', 'Rogz', 'Royal Canin', 'Rubbn n Roll', 'Salvaje', 'SanDimas', 'Sanilove', 'Sano &amp; Bello', 'Sanytol', 'Scalibor', 'Scalibor + Frontline', 'Schesir', 'Seresto', 'Seresto + Advantix', 'Seresto + Frontline', 'Serrano', 'Simple Solutions', 'SmartBones', 'SnuggleSafe', 'Specific', 'Sprenger', 'Stangest', 'Stanvet', 'Star Wars', 'Stefanplast', 'Stuzzy', 'Summer Vibes', 'Summum', 'Sure Petcare', 'Taste of the Wild', 'Taste Of The Wild', 'Tastybone', 'Tasty Bone', 'ThunderShirt', 'Tickless', 'Tk Pet', 'TK-Pet', 'Tk-Pet', 'Tractive', 'Treatricks', 'Tre Ponti', 'Trixie', 'Tropiclean', 'True Origins', 'Twinky', 'Ultima', 'United Pets', 'Urano Vet', 'Vectra', 'Veggie Toppings', "Vet's Best", 'VetAid', 'Vetoquinol', 'Vetplus', 'Vetriderm', 'Virbac', 'Vitakraft', 'Wellness Core', 'Whimzees', 'Wild Balance', 'Wonder Christmas', 'Wondermals', 'Wow Gum', 'X-TRM', 'Yes!pH', 'Zoetis'],
      expandido: false
    },
    {
      titulo: 'CATEGORÍA',
      datos: ['Pienso', 'Dietas veterinarias', 'Juguetes', 'Comida húmeda', 'Snacks', 'Antiparasitarios', 'Camas', 'Transportines y viajes', 'Arneses,correas,...', 'Ropa', 'Higiene y Salud', 'Casetas, jaulas y Hogar', 'Gateras y Redes', 'Comederos y Bebederos', 'Juguetes', 'Cuidado del pelo', 'Complementos', 'Adiestramiento y Agilidad', 'Decoración y Accesorios'],
      expandido: false
    },
    {
      titulo: 'PRODUCTO EN OFERTA',
      datos: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4'],
      expandido: false
    },
    {
      titulo: 'EDAD',
      datos: ['Cachorro', 'Junior', 'Adulto', 'Senior'],
      expandido: false,
    },
    {
      titulo: 'TAMAÑO RAZAS',
      datos: ['Pequeñas', 'Medianas', 'Grandes', 'Gigantes'],
      expandido: false
    },
    {
      titulo: 'NUTRICIÓN',
      datos: ['Hipoalergénico', 'Natural', 'Rico en proteínas', 'Sin cereales', 'Sin gluten', 'Dietas veterinarias', 'Con cereales', 'Light', 'Rico en fibra', 'Semihúmedo', 'Vegetariano', 'Vegano', 'Sin lactosa'],
      expandido: false
    },
    {
      titulo: 'CUIDADOS ESPECÍFICOS',
      datos: ['Articulaciones', 'Cardiaco', 'Control de peso', 'Dental', 'Diabetes', 'Digestivo', 'Esterilizado', 'Gestación/Lactación', 'Hepático', 'Hipoalergénico', 'Piel sensible', 'Renal/Urinario'],
      expandido: false
    },
    {
      titulo: 'SABORES',
      datos: ['Pollo', 'Salmón', 'Ternera', 'Buey', 'Cordero', 'Atún', 'Pavo', 'Cerdo', 'Jabalí', 'Pato', 'Venado', 'Otros pescados', 'Hígado', 'Conejo', 'Pescado blanco', 'Verduras', 'Ave de corral'],
      expandido: false
    },
    {
      titulo: 'MATERIAL',
      datos: ['Acero inoxidable', 'Algodón', 'Caucho', 'Cuerda', 'Cuero', 'Madera', 'Metal', 'Plástico', 'Nylon', 'Poliéster', 'Tela', 'Mimbre', 'Goma'],
      expandido: false
    },
    {
      titulo: 'COLOR',
      datos: ['Gris', 'Azul', 'Negro', 'Rojo', 'Verde', 'Blanco', 'Estampado', 'Rosa', 'Naranja', 'Marrón', 'Beige', 'Burdeos'],
      expandido: false
    },
    {
      titulo: 'EFECTIVO CONTRA',
      datos: ['Garrapatas', 'Flebotomos', 'Piojos', 'Pulga'],
      expandido: false
    }
  ];

  datos: any[] = [
    {
      titulo: 'Acana Pacific Adulto 3kg',
      imagen: './assets/sacoPiensoPerro/Acana/acanaPacificAdult.webp',
      categorias: ['Pienso', 'Acana'],
      precio: '17.95'
    },
    {
      titulo: 'Tarjeta 2',
      imagen: './assets/sacoPiensoPerro/Acana/acanaFitAdult.webp',
      categorias: ['Pienso'],
      precio: '21.90'
    },
    {
      titulo: 'Tarjeta 3',
      imagen: './assets/sacoPiensoPerro/Acana/acanaPacificAdult.webp',
      categorias: ['Snacks']

    }, {
      titulo: 'Tarjeta 4d',
      imagen: './assets/sacoPiensoPerro/Acana/acanaFitAdult.webp',
      categorias: ['Snacks']
    },
    {
      titulo: 'Tarjeta 5',
      imagen: './assets/sacoPiensoPerro/Acana/acanaPacificAdult.webp',
      categorias: ['Snacks']
    },
    {
      titulo: 'Tarjeta 6',
      imagen: './assets/sacoPiensoPerro/Acana/acanaFitAdult.webp',
      categorias: ['Pienso']
    },
    {
      titulo: 'Tarjeta 7',
      imagen: './assets/sacoPiensoPerro/saco1.webp',
      categorias: ['Snacks']
    },
    {
      titulo: 'Tarjeta 8',
      imagen: './assets/sacoPiensoPerro/saco1.webp',
      categorias: ['Snacks']
    },
    {
      titulo: 'Tarjeta 9',
      imagen: './assets/sacoPiensoPerro/saco1.webp',
      categorias: ['Snacks']
    },
    {
      titulo: 'Tarjeta 10',
      imagen: './assets/sacoPiensoPerro/saco1.webp',
      categorias: ['Snacks']
    }
    // Agrega más datos de tarjetas aquí
  ];

  datosCompletos: Producto[] = [];

  cantidadMostrada = 6;
  cantidadPorCargar = 4;
  alturaContenedor = 1300;
  seleccionados: any[] = [];
  selecciones: any[] = [];
  datosFiltradosResV: Producto[] = [];


  constructor(private sharedService: SharedServiceService, private productoService: ProductosService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.items.forEach(item => {
      item.expandido = false;
    });
  }


  ngOnInit(): void {
    this.obtenerProductos();
    this.activatedRoute.queryParams.subscribe(params => {
      const dato = params['dato'];

      if (dato) {
        this.marcarElemento(dato);
      }
    });
  }

  obtenerProductos() {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (productos: Producto[]) => {
        this.datosCompletos = productos;
        this.datosFiltradosResV = productos;
        console.log(this.datosCompletos);
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

  cargarMas(): void {
    this.cantidadMostrada += this.cantidadPorCargar;
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

  get datosFiltrados(): any[] {
    return this.datos.filter(dato => {
      return this.seleccionados.some(sel => dato.categoria === sel);
    });
  }

  calcularAlturaContenedor(): void {
    const cantidadTarjetas = Math.min(this.cantidadMostrada, this.datos.length);
    const cantidadFilas = Math.ceil(cantidadTarjetas / 3);
    this.alturaContenedor = cantidadFilas * 450;
  }

  openModalFiltrar() {
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
