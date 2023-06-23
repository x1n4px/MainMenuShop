export interface Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  roles: string[];
  clientes: {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    dni: string;
    localidad: string;
    codigoPostal: string;
    numeroTelefono: string;
    numeroMovil: string;
    email: string;
    direccion: string;
    puntos: number;
    valeClientes: any[]; // Define la estructura correcta de valeClientes si es necesario
  };
}
