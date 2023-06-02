import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from './class/ticket';
import { Cliente } from './class/cliente';
import { Producto } from './class/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  public crearUsuario(loginRegister: any) {
    return this.http.post(`http://localhost:8080/register`, loginRegister);
  }


  public generateToken(loginData: any) {
    return this.http.post(`http://localhost:8080/login`, loginData);
  }

  public requestNewPassword(email: string) {
    const requestBody = { email };
    return this.http.post(`http://localhost:8080/passwordreset`, requestBody);
  }

  public getCurrentUser() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:8080/${this.getEmail()}`, { headers });
  }



  public loginUser(token: any, email: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    return true;
  }

  public getUser() {
    let userSt = localStorage.getItem('user');
    if (userSt != null) {
      return JSON.parse(userSt);
    } else {
      this.logout();
      return null;
    }
  }

  public getEmail() {
    return localStorage.getItem('email');
  }

  public getToken() {
    return localStorage.getItem('token');
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  public obtenerTodosLosProductos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(`http://localhost:8080/producto/todos`, { headers });

  }

  public obtenerTodosLosClientes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente[]>(`http://localhost:8080/cliente/todos`, { headers });

  }


  public obtenerTodosLosTicket() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket[]>(`http://localhost:8080/ticket/todos`, { headers });

  }


  getUserDetails() {
    return this.http.get("http://localhost:8080/profile");
  }

  buscarProducto(busqueda: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(`http://localhost:8080/buscar?nombre=${busqueda}`, { headers });
  }

  buscarCliente(busqueda: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente[]>(`http://localhost:8080/buscarCliente?nombre=${busqueda}`, { headers });
  }

  buscarTicket(busqueda: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ticket[]>(`http://localhost:8080/buscarTicket?referencia=${busqueda}`, { headers });
  }

  enviarTicket(ticket: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/ticket`, ticket, { headers });
  }

  actualizarCliente(id: any, cliente: Cliente): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`http://localhost:8080/cliente/${id}`, cliente, { headers });
  }

  crearCliente(cliente: Cliente): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:8080/cliente/`, cliente, { headers });
  }
}
