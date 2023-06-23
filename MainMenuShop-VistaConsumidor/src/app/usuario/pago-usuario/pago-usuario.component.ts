import { Component } from '@angular/core';
import { Usuario } from 'src/app/class/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-pago-usuario',
  templateUrl: './pago-usuario.component.html',
  styleUrls: ['./pago-usuario.component.css']
})
export class PagoUsuarioComponent {
  constructor(private usuario:UsuarioService){ }
  User!: Usuario;
  ngOnInit(): void {
    this.User = this.usuario.getSaveCurrentUser();
  }
}
