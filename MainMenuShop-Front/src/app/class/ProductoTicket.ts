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
   producto!: Producto;
  cantidad!:number;
 }
