import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route:Router) {


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
}
