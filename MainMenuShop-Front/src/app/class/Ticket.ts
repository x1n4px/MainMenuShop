import { Productos } from "./ Productos";
import { Cliente } from "./Cliente";

export class Ticket {
  id!:number;
  referencia!:string;
  vendedor!:string;
  cliente!: Cliente;
  productos!: Productos[];
  fecha!:string;
  hora!:string;
  metodoPago!:string;
}
