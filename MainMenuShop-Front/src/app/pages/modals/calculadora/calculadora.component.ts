import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {

  constructor(
    public dialogRef: MatDialogRef<CalculadoraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) {

  }

  operaciones = {
    sumar: '+',
    restar: '-',
    multiplicar: '*',
    dividir: '/',
    igualdad: '=',
    porcentaje: '%'
  }

  operacionCompleta: string = '';
  operacion!: string;
  resultado: string = '';
  numero1: string = '';
  numero2: string = '';
  porcentaje: boolean = false;

  asignarOperacion(operacion: any) {
    this.operacion = operacion;
  }

  asignarValor(valor: any) {
    if (valor != this.operaciones.igualdad) {
      this.operacionCompleta = this.operacionCompleta.concat(valor);
    }
    if(this.porcentaje && valor == this.operaciones.igualdad){
      this.operacionCompleta = this.operacionCompleta.concat(this.operaciones.porcentaje);

    }


    if (valor != this.operaciones.porcentaje && valor != this.operaciones.igualdad && valor != this.operaciones.dividir && valor != this.operaciones.sumar && valor != this.operaciones.restar && valor != this.operaciones.multiplicar) {
      this.resultado = this.resultado.concat(valor);
    } else {
      if (valor != this.operaciones.igualdad) {
        this.operacion = valor;
      }

      if (this.numero1 == '') {

        this.numero1 = this.resultado;
        this.resultado = '';
        console.log(this.numero1 + '   ' + this.numero2);
      } else if (this.numero2 == '') {
        this.numero2 = this.resultado;
        this.resultado = '';
        if (valor == this.operaciones.igualdad) {
          this.calcular();
        }

      }
    }
  }

  calcular() {
    switch (this.operacion) {
      case '+':
        this.sumar();
        break;
      case '-':
        this.restar();
        break;
      case '*':
        this.multiplicar();
        break;
      case '/':
        console.log("Hola");
        this.dividir();
        break;
    }
  }

  sumar() {
    console.log("Sumar");
    if (!this.porcentaje) {
      let result = parseFloat(this.numero1) + parseFloat(this.numero2);
      this.resultado = (result.toFixed(2)).toString();
    } else {
      let result = parseFloat(this.numero1) + (parseFloat(this.numero1) * (parseFloat(this.numero2) / 100));
      this.resultado = (result.toFixed(2)).toString();
    }

  }


  restar() {
    if (!this.porcentaje) {
      let result = parseFloat(this.numero1) - parseFloat(this.numero2);
      this.resultado = (result.toFixed(2)).toString();
    } else {
      let result = parseFloat(this.numero1) - (parseFloat(this.numero1) * (parseFloat(this.numero2) / 100));
      this.resultado = (result.toFixed(2)).toString();
    }

  }

  multiplicar() {
    if (!this.porcentaje) {
      let result = parseFloat(this.numero1) * parseFloat(this.numero2);
      this.resultado = (result.toFixed(2)).toString();
    } else {
      let result = parseFloat(this.numero1) * (parseFloat(this.numero1) * (parseFloat(this.numero2) / 100));
      this.resultado = (result.toFixed(2)).toString();
    }

  }

  dividir() {
    if (!this.porcentaje) {
      let result = parseFloat(this.numero1) / parseFloat(this.numero2);
      this.resultado = (result.toFixed(2)).toString();
    } else {
      let result = parseFloat(this.numero1) / (parseFloat(this.numero1) * (parseFloat(this.numero2) / 100));
      this.resultado = (result.toFixed(2)).toString();
    }

  }

  limpiar() {
    this.numero1 = '';
    this.numero2 = '';
    this.operacion = '';
    this.operacionCompleta = '';
    this.porcentaje = false;
  }

  limpiarCompleto(){
    this.limpiar();
    this.resultado = '';
  }
}
