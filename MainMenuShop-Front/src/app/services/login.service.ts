import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';
import { map } from 'rxjs';
import { User } from '../User';
import { Observable } from 'rxjs';
import { Producto } from '../Producto';
import { Cliente } from '../Cliente';
import { Ticket } from '../Ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = "http://localhost:8080";
  private eURL = "http://localhost:8080/eliminarUsuario";
  private rURL = "http://localhost:8080/recover-password";
  private rqURL = "http://localhost:8080/requestNewPassword";



  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.http.post(environment.baseURI + `/generate-token`,loginData);

  }

  public getCurrentUser(){
    return this.http.get(environment.baseURI + `/user/actual`);
  }

  public getAllUser(){
    return this.http.get<User[]>(environment.baseURI + `/user/todos`);
  }

  eliminarUsuario(id:number): Observable<Object>{
    return this.http.delete(environment.baseURI + `/user/eliminarUsuario/${id}`);  }


  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any>{
    const body = {email, currentPassword, newPassword};
    return this.http.post<any>(environment.baseURI + `/user/perfil/cambiarClave`, body);
  }

  obtenerUsuarioPorId(id:number):Observable<User>{
    return this.http.get<User>(environment.baseURI + `/user/${id}`);
  }

  actualizarUsuario(id:number, usuario:User) : Observable<Object>{
    return this.http.put(environment.baseURI + `user/${id}`, usuario);
  }

  public obtenerTodosLosProductos(){
    return this.http.get<Producto[]>(environment.baseURI + `/producto/todos`);

  }

  public obtenerTodosLosClientes(){
    return this.http.get<Cliente[]>(environment.baseURI + `/cliente/todos`);

  }


  public obtenerTodosLosTicket(){
    return this.http.get<Ticket[]>(environment.baseURI + `/ticket/todos`);

  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.rolAsignado;
  }

  getUserDetails() {
    return this.http.get(environment.baseURI + "/profile");
  }

  buscarProducto(busqueda: string) {
    return this.http.get<Producto[]>(environment.baseURI + `/buscar?nombre=${busqueda}`);
  }

  buscarCliente(busqueda: string) {

    return this.http.get<Cliente[]>(environment.baseURI + `/buscarCliente?nombre=${busqueda}`);
  }

  buscarTicket(busqueda: string) {
    return this.http.get<Ticket[]>(environment.baseURI + `/buscarTicket?referencia=${busqueda}`);
  }

  enviarTicket(ticket: any): Observable<any> {
    return this.http.post<any>(environment.baseURI + `/ticket`, ticket);
  }

  actualizarCliente(id:number, cliente:Cliente):Observable<Object>{
    return this.http.put(environment.baseURI + `/cliente/${id}`, cliente);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(environment.baseURI + `/cliente/`, cliente);
  }
}
