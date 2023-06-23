import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  User?: Usuario;
  constructor(private usuario: UsuarioService, private router: Router) {

  }
  ngOnInit(): void {
    this.usuario.getCurrentUser().subscribe(
      (Response: Usuario) => {
        this.User = Response;
        this.usuario.setCurrentUser(this.User);
      }, (error) => {

      }
    )
  }



  close() {
    this.usuario.logout();
    this.router.navigate(['login']);
  }
}
