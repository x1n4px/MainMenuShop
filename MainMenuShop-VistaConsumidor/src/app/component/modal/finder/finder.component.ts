import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/class/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent {
  constructor(
    public dialogRef: MatDialogRef<FinderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productosS: ProductosService) {

  }

  edad: string = '';
  categoria: string = '';
  familia: string = '';
  productos: Producto[] = [];
  showStage1: boolean = true;
  showStage15: boolean = false;
  showStage2: boolean = false;
  showStage3: boolean = false;
  showStage4: boolean = false;
  showStage5: boolean = false;
  showStage6: boolean = false;
  showStage7: boolean = false;
  seleccionado: boolean = false;
  mostrarOpciones: boolean = true;
  opciones = [
    { nombre: 'Pienso', visible: true },
    { nombre: 'Comida Humeda', visible: true },
    { nombre: 'Snacks', visible: true },
    { nombre: 'Dietas veterinarias', visible: true },
    { nombre: 'Antiparasitarios', visible: true },
    { nombre: 'Camas', visible: true },
    { nombre: 'Casetas, jaulas y Hogar', visible: true },
    { nombre: 'Arneses y correas', visible: true },
    { nombre: 'Juguetes', visible: true },
    { nombre: 'Ropa', visible: true },
    { nombre: 'Transportines y viaje', visible: true },
    { nombre: 'Higiene', visible: true }
    // Resto de las opciones
  ];
  selectorDeCategoria: any[] = [];
  selectorDeCategoriaS5: any[] = [];
  selectorDeCategoriaS6: any[] = [];




  seleccionarEdad(edad: string) {
    this.edad = edad;
    this.change('stage3');
  }


  seleccionarFamilia(familia: string) {
    this.familia = familia;
    this.change('stage2');

  }





  seleccionarStage2(opcion: any) {
    this.categoria = opcion.nombre;
    for (let i = 0; i < this.opciones.length; i++) {
      if (this.opciones[i].nombre === opcion.nombre) {
        this.opciones[i].visible = true;
      } else {
        this.opciones[i].visible = false;
      }
    }

    if (opcion.nombre === 'Comida Humeda') {
      opcion.nombre = 'Humeda';
    }

    this.productosS.obtenerFiltradoRapido(this.familia, opcion.nombre).subscribe(result => {
      console.log(result);
      this.productos = result.filter(producto => producto.etapaVida === this.edad);
      console.log(this.productos);
    });
    opcion.visible = false;
    this.change('stage4');
    this.selectorDadoCategoria(opcion.nombre);
  }



  verProductos() {
    this.dialogRef.close({
      listaProductosBusqueda: this.productos
    });
  }

  selectorDadoCategoria(categoria: any) {
    if (categoria === 'Pienso' || categoria === 'Humeda' || categoria === 'Snacks' || categoria === 'Dietas veterinarias') {
      this.selectorDeCategoria =
        ['Pollo', 'Salmón', 'Arenque'];
    } else if (categoria === 'Juguetes') {
      this.selectorDeCategoria = ['Acero inoxidable', 'Algodón', 'Caucho', 'Cuerda', 'Cuero', 'Madera', 'Metal', 'Plástico', 'Nylon', 'Poliéster', 'Tela', 'Mimbre', 'Goma'];
    } else if (categoria === 'Antiparasitarios') {
      this.selectorDeCategoria = ['Garrapatas', 'Flebotomos', 'Piojos', 'Pulga'];
    }
  }

  selectorCategoriaS5() {
    if (this.categoria === 'Dietas veterinarias') {
      this.selectorDeCategoriaS5 = ['Articulaciones', 'Cardiaco', 'Control de peso', 'Dental', 'Diabetes', 'Digestivo', 'Esterilizado', 'Gestación/Lactación', 'Hepático', 'Hipoalergénico', 'Piel sensible', 'Renal/Urinario'];

    } else if (this.categoria === 'Pienso') {
      this.selectorDeCategoriaS5 = ['Hipoalergénico', 'Natural', 'Rico en proteínas', 'Sin cereales', 'Sin gluten', 'Dietas veterinarias', 'Con cereales', 'Light', 'Rico en fibra', 'Semihúmedo', 'Vegetariano', 'Vegano', 'Sin lactosa'];
    }

    this.selectorCategoriaS6();
    this.change('stage5');
  }

  selectorCategoriaS6() {
    if(this.categoria === 'Pienso'){
      if(this.familia === 'Perro'){
        this.selectorDeCategoriaS6 = ['Acana', 'Advance'];
      }else if(this.familia === 'Gato') {
        this.selectorDeCategoriaS6 = ['Acana', 'Applaws'];
      }
    }else if(this.categoria === 'Comida Humeda') {
      if(this.familia === 'Perro'){
        this.selectorDeCategoriaS6 = ['Mhims'];
      }else if(this.familia === 'Gato') {
        this.selectorDeCategoriaS6 = ['Mhims'];
      }
    }
   }

  filtradoGeneral(datoStage: any, stage: any) {
    if (stage === 'stage3') {
      //categoria
      this.productos = this.productos.filter(producto => producto.categoría === this.categoria);
    } else if (stage === 'stage4') {
      if (this.categoria === 'Pienso' || this.categoria === 'Humeda' || this.categoria === 'Snacks' || this.categoria === 'Dietas veterinarias') {
        //sabor
        this.productos = this.productos.filter(producto => producto.sabores === datoStage);
      } else if (this.categoria === 'Juguetes') {
        this.productos = this.productos.filter(producto => producto.material === datoStage);

      } else if (this.categoria === 'Antiparasitarios') {
        this.productos = this.productos.filter(producto => producto.efectivoContra === datoStage);
      }

      this.selectorCategoriaS5();
    } else if (stage === 'stage5') {
      this.change('stage5');
    }else if(stage === 'stage6') {
      this.productos = this.productos.filter(producto => producto.marca === datoStage);
      this.change('stage7');
    }
  }

  change(stage: any) {
    if (stage === 'stage1') {
      this.showStage1 = false;
      this.showStage2 = true;
    } else if (stage === 'stage2') {
      this.showStage2 = false;
      this.showStage15 = true;
    } else if (stage === 'stage3') {
      this.showStage15 = false;
      this.showStage3 = true;
    } else if (stage === 'stage4') {
      this.showStage3 = false;
      this.showStage4 = true;
    } else if (stage === 'stage5') {
      this.showStage4 = false;
       this.showStage5 = false;
      this.showStage6 = true;
    } else if (stage === 'stage6') {
      this.showStage5 = false;
      this.showStage6 = true;
    }else if (stage === 'stage7') {
      this.showStage6 = false;
      this.showStage7 = true;
    }
  }
}
