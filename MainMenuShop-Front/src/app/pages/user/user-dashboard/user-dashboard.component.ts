import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  usuarioActual: any;
  rolAsignado!: string;
  constructor(private route: Router, private loginService:LoginService) { }
  isLoggedIn = false;
  formularioConsultarTicket = false;
  formularioDevolverTicket = false;
  formularioRecuperarTicket = false;
  formularioCierreCaja = false;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.loginService.getCurrentUser().subscribe(data => {
      this.usuarioActual = data;
    });
    this.rolAsignado = this.usuarioActual.rolAsignado;
  }




  funcionParaAdmin(){
    this.route.navigate(['admin']);

  }

  
  public logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.route.navigate(['']);
  }

  mostrarConsultarTicket(){
    this.formularioConsultarTicket = true;
  }

  ocultarConsultarTicket(){
    this.formularioConsultarTicket = false;
  }

  mostrarDevolverTicket(){
    this.formularioDevolverTicket = true;
  }

  ocultarDevolverTicket(){
    this.formularioDevolverTicket = false;
  }


  mostrarRecuperarTicket(){
    this.formularioRecuperarTicket = true;
  }

  ocultarRecuperarTicket(){
    this.formularioRecuperarTicket = false;
  }

  mostrarCierreCaja(){
    this.formularioCierreCaja = true;
  }
  ocultarCierreCaja(){this.formularioCierreCaja=false;}






}
