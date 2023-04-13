import { Cliente } from "./Cliente";
import { Producto  } from "./Producto";
import { Productos } from "./ Productos";

export class Ticket {
  id!:number;
  referencia!:string;
  vendedor!:string;
  cliente!: Cliente;
  productos!: Productos[];
  fecha!:string;
  hora!:string;
}
