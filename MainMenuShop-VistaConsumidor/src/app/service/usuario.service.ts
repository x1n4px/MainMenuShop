import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../class/login';
import { Usuario } from '../class/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: Login) {
    return this.http.post('http://localhost:8080/login', usuario);
  }

  public getToken() {
    return localStorage.getItem('token');
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    return true;
  }

  public setToken(token: any, email: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    return true;
  }

  public getEmail() {
    return localStorage.getItem('email');
  }

  public getCurrentUser(): Observable<Usuario> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`http://localhost:8080/${this.getEmail()}`, { headers });
  }

  public setCurrentUser(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getSaveCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (error) {
        console.error('Error al analizar el objeto de usuario almacenado en localStorage:', error);
      }
    }
    return null;
  }
}
