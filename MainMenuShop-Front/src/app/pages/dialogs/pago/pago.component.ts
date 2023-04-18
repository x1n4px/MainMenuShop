import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productos } from 'src/app/ Productos';
import { Producto } from 'src/app/Producto';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent  {

  constructor(
    public dialogRef: MatDialogRef<PagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clienteActual = data.clienteActual;
    this.cesta = data.cesta;
    console.log(this.clienteActual);
    console.log(this.cesta);
    this.totalCesta();
  }

  cesta: Producto[] = [];
  total!:number;
  dineroEfectivo!:number;
  clienteActual: any ;
  compraEfectiva = false;
  compraTarjeta = false;
  metodoPago!: number;
  cantidad: number = 0;

  totalCesta(){
    let sumaPrecios = 0;
    for(let i = 0; i < this.cesta.length; i++){
      sumaPrecios += this.cesta[i].precio;
    }
    this.total = parseFloat(sumaPrecios.toFixed(2));
  }

  terminarCompraEfectivo(){

    console.log(this.metodoPago);
    this.dialogRef.close({
      total: this.total,
      metodoPago: this.metodoPago,
      clienteActual:this.clienteActual,
      cesta:this.cesta
    });
  }


  ocultarPanelCobro(){
    this.compraEfectiva = false;
    this.compraTarjeta = false;
  }

  efectivo!:number ;
  tarjeta!:number;

  selected: string | null = null;
  noSelected: string | null = null;
  select(option: string) {
    this.selected = this.selected === option ? null : option;
   }

  selected2: string | null = null;
  noSelected2: string | null = null;
  select2(option: string) {
    this.selected2 = this.selected2 === option ? null : option;
  }

}
