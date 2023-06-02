import { Cliente } from "./cliente";
import { Productos } from "./productos";

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
