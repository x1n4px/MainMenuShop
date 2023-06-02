import { ValeCliente } from "./vale-cliente";



export class Cliente {
  id!:number;
  nombre!:string;
  apellido1!:string;
  apellido2!:string;
  codigoPostal!:string;
  dni!:string;
  email!:string;
  localidad!:string;
  numeroMovil!:string;
  numeroTelefono!:string;
  rol!:string;
  direccion!:string;
  valecliente!: ValeCliente[];
  puntos!: number;
 }
