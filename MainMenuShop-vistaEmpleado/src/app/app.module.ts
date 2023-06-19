import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { LoginComponent } from './modals/login/login.component';
import { PasswordresetComponent } from './modals/passwordreset/passwordreset.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MenuPrincipalComponent } from './component/menu-principal/menu-principal.component';
import { LoginMenuComponent } from './component/login-menu/login-menu.component';
import { AvisoClienteComponent } from './modals/aviso-cliente/aviso-cliente.component';
import { CalculadoraComponent } from './modals/calculadora/calculadora.component';
import { CierreCajaComponent } from './modals/cierre-caja/cierre-caja.component';
import { ConsultarTicketComponent } from './modals/consultar-ticket/consultar-ticket.component';
import { DatosArticuloComponent } from './modals/datos-articulo/datos-articulo.component';
import { DatosClienteComponent } from './modals/datos-cliente/datos-cliente.component';
import { DevolucionDineroComponent } from './modals/devolucion-dinero/devolucion-dinero.component';
import { PagoComponent } from './modals/pago/pago.component';
import { RecuperarTicketComponent } from './modals/recuperar-ticket/recuperar-ticket.component';
import { RetiradaEfectivoComponent } from './modals/retirada-efectivo/retirada-efectivo.component';
import { ImporteDiaComponent } from './modals/importe-dia/importe-dia.component';

@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
    PasswordresetComponent,
    MenuPrincipalComponent,
    LoginMenuComponent,
    AvisoClienteComponent,
    CalculadoraComponent,
    CierreCajaComponent,
    ConsultarTicketComponent,
    DatosArticuloComponent,
    DatosClienteComponent,
    DevolucionDineroComponent,
    PagoComponent,
    RecuperarTicketComponent,
    RetiradaEfectivoComponent,
    ImporteDiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
