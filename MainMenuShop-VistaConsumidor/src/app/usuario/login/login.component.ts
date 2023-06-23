import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/class/Register';
import { Login } from 'src/app/class/login';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  botonLoginPulsado = true;
  botonRegisterPulsado = false;
  esRegistro: boolean = true;
  alturaContenedor: string = '700px';
  userLogin = new Login("", "");
  userRegister = new Register("", "", "", "", "", "");

  constructor(private route:Router, private usuario:UsuarioService) {


  }

  cambiarEstado(option: number) {
    if (option === 0) {
      this.botonLoginPulsado = true;
      this.botonRegisterPulsado = false;
      this.esRegistro = false;
      this.cambiarAltura();
    } else {
      this.botonRegisterPulsado = true;
      this.botonLoginPulsado = false;
      this.esRegistro = true;
      this.cambiarAltura();
    }
  }

  cambiarAltura() {
    this.esRegistro = !this.esRegistro;
    this.alturaContenedor = this.esRegistro ? '700px' : '1050px';
  }

  perfil() {
    this.route.navigate(['cuenta/perfil']);
  }


  formularioLogin() {
    this.usuario.login(this.userLogin).subscribe(
      (data: any) => {
        this.usuario.setToken(data.token, this.userLogin.email);
         this.route.navigate(['cuenta/perfil']);


      }, (error) => {
        alert("Datos erroneos");
      }
    );
  }

  formularioRegister() {

  }


}
