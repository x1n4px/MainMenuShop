import { Cliente } from "./Cliente";
import { Producto } from "./Producto";
import { Ticket } from "./Ticket";

export class ProductoTicket {
  id!:number;
  referencia!:string;
  vendedor!:string;
  cliente!: Cliente;
   fecha!:string;
  hora!:string;
  metodoPago!:string;
  productos!: TProductos[];
}


export class TProductos {
  id!:number;
  producto!: Producto;
  cantidad!:number;
  devolucion:boolean = false;
}
