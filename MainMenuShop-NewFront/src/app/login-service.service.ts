import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './class/ticket';
import { Cliente } from './class/cliente';
import { Producto } from './class/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  public crearUsuario(loginRegister:any){
    return this.http.post(`http://localhost:8080/register`, loginRegister);
  }


  public generateToken(loginData:any){
    return this.http.post(`http://localhost:8080/login`,loginData);
  }

  public requestNewPassword(email:string){
    const requestBody = { email};
    return this.http.post(`http://localhost:8080/passwordreset`, requestBody);
  }

  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  public obtenerTodosLosProductos(){
    return this.http.get<Producto[]>(`http://localhost:8080/producto/todos`);

  }

  public obtenerTodosLosClientes(){
    return this.http.get<Cliente[]>( `http://localhost:8080/cliente/todos`);

  }


  public obtenerTodosLosTicket(){
    return this.http.get<Ticket[]>(`http://localhost:8080/ticket/todos`);

  }


  getUserDetails() {
    return this.http.get( "http://localhost:8080/profile");
  }

  buscarProducto(busqueda: string) {
    return this.http.get<Producto[]>(`http://localhost:8080/buscar?nombre=${busqueda}`);
  }

  buscarCliente(busqueda: string) {

    return this.http.get<Cliente[]>(`http://localhost:8080/buscarCliente?nombre=${busqueda}`);
  }

  buscarTicket(busqueda: string) {
    return this.http.get<Ticket[]>(`http://localhost:8080/buscarTicket?referencia=${busqueda}`);
  }

  enviarTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/ticket`, ticket);
  }

  actualizarCliente(id:number, cliente:Cliente):Observable<Object>{
    return this.http.put(`http://localhost:8080/cliente/${id}`, cliente);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`http://localhost:8080/cliente/`, cliente);
  }
}
