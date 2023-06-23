import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-pago-sin-usuario',
  templateUrl: './pago-sin-usuario.component.html',
  styleUrls: ['./pago-sin-usuario.component.css']
})
export class PagoSinUsuarioComponent implements OnInit {
  cesta: any[] = [];
  subtotal: number = 0;
  lineaAvance: number = 0;
  User:boolean = false;

  constructor(private shared:SharedServiceService, private usuario: UsuarioService, private router: Router) {}
  ngOnInit(): void {
    this.cesta = this.shared.obtenercesta();
    this.costecesta();
    this.usuario.getToken()? this.User=true: this.User=false;
   }

  costecesta() {
    this.cesta.forEach(elemento => {
      this.subtotal += (elemento.precioNeto)+(elemento.precioNeto*(elemento.ivaAsociado/100));
      console.log(elemento);
    })

  }

  finalizarPedido() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
  }


}
