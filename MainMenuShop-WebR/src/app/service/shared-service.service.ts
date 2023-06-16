import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  @Output() marcarElementoEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }
  private cesta: any[] = [];

  marcarElemento(dato: any): void {
    this.marcarElementoEvent.emit(dato);
  }

  aniadirProductoCesta(producto: any): void {
    this.cesta.push(producto);
    console.log(this.cesta);
  }

  obtenercesta() {
    return this.cesta;
  }
}
