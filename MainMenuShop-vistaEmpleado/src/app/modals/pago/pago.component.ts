import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { Producto } from 'src/app/class/producto';
import { DevolucionDineroComponent } from '../devolucion-dinero/devolucion-dinero.component';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {

  constructor(
    public dialogRef: MatDialogRef<PagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) {
    this.clienteActual = data.clienteActual;
    this.cesta = data.cesta;
    console.log(this.clienteActual);
    console.log(this.cesta);
    this.totalCesta();
  }

  cesta: Producto[] = [];
  total!:number;
  dineroEfectivo:number = 0;
  clienteActual: any ;
  compraEfectiva = false;
  compraTarjeta = false;
  metodoPago!: number;
  cantidad: number = 0;
  ivaAplicado: number = 0;

  totalCesta(){
    let sumaPrecios = 0;
    for(let i = 0; i < this.cesta.length; i++){
      if(this.clienteActual.rol == 'EMPLEADO'){
        sumaPrecios += (this.cesta[i].precioNeto*0.8);
      }else{
        this.ivaAplicado += this.cesta[i].precioNeto * (this.cesta[i].ivaAsociado/100);
        sumaPrecios += this.cesta[i].precioNeto + this.cesta[i].precioNeto * (this.cesta[i].ivaAsociado/100);
      }
    }
    this.total = parseFloat(sumaPrecios.toFixed(2));
    console.log(this.total);
    this.ivaAplicado = parseFloat(this.ivaAplicado.toFixed(2));
    console.log(this.ivaAplicado);
  }

  terminarCompraEfectivo(){

    console.log(this.metodoPago);
    this.dialogRef.close({
      total: this.total,
      ivaAplicado: this.ivaAplicado,
      metodoPago: this.metodoPago,
      clienteActual:this.clienteActual,
      cesta:this.cesta
    });
    const dialogRef = this.dialog.open(DevolucionDineroComponent, {
      data: {
        total:this.total,
        dineroEfectivo:this.dineroEfectivo
      }
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
