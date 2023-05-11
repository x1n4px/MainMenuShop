import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';
import { RecuperarTicketComponent } from './pages/modals/recuperar-ticket/recuperar-ticket.component';
import { ConsultarTicketComponent } from './pages/modals/consultar-ticket/consultar-ticket.component';
import { DatosArticuloComponent } from './pages/modals/datos-articulo/datos-articulo.component';
import { DatosClienteComponent } from './pages/modals/datos-cliente/datos-cliente.component';
import { PagoComponent } from './pages/modals/pago/pago.component';
import { CierreCajaComponent } from './pages/modals/cierre-caja/cierre-caja.component';
import { RetiradaEfectivoComponent } from './pages/modals/retirada-efectivo/retirada-efectivo.component';
import { DevolucionDineroComponent } from './pages/modals/devolucion-dinero/devolucion-dinero.component';
import { AvisoClienteComponent } from './pages/modals/aviso-cliente/aviso-cliente.component';
 import { CalculadoraComponent } from './pages/modals/calculadora/calculadora.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    EditUserComponent,
    RecuperarTicketComponent,
    ConsultarTicketComponent,
    DatosArticuloComponent,
    DatosClienteComponent,
    PagoComponent,
    CierreCajaComponent,
    RetiradaEfectivoComponent,
    DevolucionDineroComponent,
    AvisoClienteComponent,
     CalculadoraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [UserDashboardComponent]
})
export class AppModule { }
