import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-busqueda-articulos',
  templateUrl: './busqueda-articulos.component.html',
  styleUrls: ['./busqueda-articulos.component.css']
})
export class BusquedaArticulosComponent {

  constructor(
    public dialogRef: MatDialogRef<BusquedaArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.seleccionados = data.seleccionados;
  }

  ngOnInit() {
  }



  items: any[] = [
    {
      titulo: 'MARCA',
      datos: ['2&Snacks', 'AC/DC', 'Acana', 'Adaptil', 'Advance', 'Advantix', 'Adventuros', 'All For Paws', 'Almo Nature', 'Alpha Spirit', 'Arppe', 'Arquivet', 'Artero', 'Banters', 'Baskerville', 'Beaphar', 'Bimar', 'Bio-Groom', 'Bioibérica', 'Bramton', 'Breed Up', 'Brekkies', 'Buddy', 'Calier', 'Camon', 'Cani Amici', 'Canny', 'Capstar', 'Carnilove', 'Cesar', 'Chuckit!', 'Cominter', 'Cosequin', 'Criadores', 'Croci', 'Curver', 'DC', 'Dentalife', 'DentiCan', 'Designed by Lotte', 'Dibaq', 'Dingo', 'Diskount', 'Disney', 'Divasa', 'Dog Chow', 'Dog Gone Smart', 'Dogxtreme', 'Dogzilla', 'Dogzzz', 'Douxo', 'Dr. Dingo', 'Dr. Zoo', 'Dukier', 'Dynavet', 'Earth Rated', 'Edgard &amp; Cooper', 'Envy', 'Era', 'Eukanuba', 'Fatro', 'Ferplast', 'Fish4Dogs', 'Flamingo', 'Flexi', 'Fluffy', 'Forza 10', 'Francodex', 'Freedog', 'Friskies', 'Frontline', 'Frontpro', 'Furminator', 'Genia', 'GimDog', 'Gloria', 'Greenies', 'Guabu', 'Guau Christmas', 'Halti', 'Hansgrohe', 'Happy Dog', 'Healsty', 'Héry', "Hill's", 'Hobbitalf', 'Hunter', 'Iams', 'Imac', 'Innotek', 'Inodorina', 'Julius K9', 'Julius-K9', 'JW', 'Karlie', 'Knot Limit', 'Kong', 'Kumfi', 'Kw', 'Lenda', 'Libra', "Lily's Kitchen", 'Mac Leather', 'Marvel', 'Medicalpet', 'Mediterranean', 'Menforsan', 'Mhims', 'Milord', 'Moderna', 'Moments', 'Moser', 'M-Pets', 'Nath', 'Natura Diet', 'Natural Greatness', 'Natural Trainer', "Nature's Variety", 'Naturea', 'Natureats', 'Naturo', 'Nayeco', 'Neewa', 'Nice Care', 'Nite Ize', 'Nova Clean', 'Novopet', 'Nylabone', 'Ombala', 'Optimanova', 'Orijen', 'Orozyme', 'Oster', 'Otoclean', 'Outech', 'Ownat', 'Pawise', 'Paw Patrol', 'Pawz Dog', 'Pedigree', 'Petmate', 'PetSafe', 'Petstages', 'Pharmadiet', 'PlaqueOff', 'Platinum', 'Play&amp;Bite', 'Play &amp; Bite', 'Plutos', 'Primordial', 'Pro Plan', 'Puppia', 'Purina Beyond', 'Purina One', 'Ribecan', 'Rogz', 'Royal Canin', 'Rubbn n Roll', 'Salvaje', 'SanDimas', 'Sanilove', 'Sano &amp; Bello', 'Sanytol', 'Scalibor', 'Scalibor + Frontline', 'Schesir', 'Seresto', 'Seresto + Advantix', 'Seresto + Frontline', 'Serrano', 'Simple Solutions', 'SmartBones', 'SnuggleSafe', 'Specific', 'Sprenger', 'Stangest', 'Stanvet', 'Star Wars', 'Stefanplast', 'Stuzzy', 'Summer Vibes', 'Summum', 'Sure Petcare', 'Taste of the Wild', 'Taste Of The Wild', 'Tastybone', 'Tasty Bone', 'ThunderShirt', 'Tickless', 'Tk Pet', 'TK-Pet', 'Tk-Pet', 'Tractive', 'Treatricks', 'Tre Ponti', 'Trixie', 'Tropiclean', 'True Origins', 'Twinky', 'Ultima', 'United Pets', 'Urano Vet', 'Vectra', 'Veggie Toppings', "Vet's Best", 'VetAid', 'Vetoquinol', 'Vetplus', 'Vetriderm', 'Virbac', 'Vitakraft', 'Wellness Core', 'Whimzees', 'Wild Balance', 'Wonder Christmas', 'Wondermals', 'Wow Gum', 'X-TRM', 'Yes!pH', 'Zoetis'],
      expandido: false
    },
    {
      titulo: 'categoría',
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

  seleccionados: any[] = [];


  expandirItem(item: any): void {
    item.expandido = !item.expandido;

  }






  selecciones: any[] = this.items.map(item => ({
    titulo: item.titulo,
    datos: []
  }));



  marcarElemento(dato: any) {
    const titulo = this.items.find(item => item.datos.includes(dato))?.titulo;

    if (titulo) {
      const seleccionEncontrada = this.selecciones.find(seleccion => seleccion.titulo === titulo);

      if (seleccionEncontrada) {
        const index = seleccionEncontrada.datos.indexOf(dato);

        if (index > -1) {
          seleccionEncontrada.datos.splice(index, 1);
        } else {
          seleccionEncontrada.datos.push(dato);
        }
      }
    }
  }

  estaSeleccionado(dato: any): boolean {
    const titulo = this.items.find(item => item.datos.includes(dato))?.titulo;

    if (titulo) {
      const seleccionEncontrada = this.selecciones.find(seleccion => seleccion.titulo === titulo);

      if (seleccionEncontrada) {
        return seleccionEncontrada.datos.includes(dato);
      }
    }

    return false;
  }


    eliminarElementosVacios( ) {
    const resultado = this.selecciones.filter(item => item.datos.length > 0);
    return resultado;
  }



  closeModalBusqueda() {
    this.selecciones = this.eliminarElementosVacios();
    console.log(this.selecciones);
    this.dialogRef.close({ selecciones: this.selecciones });
  }


}
