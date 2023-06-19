import { Cliente } from "./cliente";
import { Producto } from "./producto";

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
