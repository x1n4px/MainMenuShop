import { Cliente } from "./Cliente";
import { Productos } from "./Productos";

export class Ticket {
  id!:number;
  referencia!:string;
  vendedor!:string;
  cliente!: Cliente;
  producto!: Productos[];
}
