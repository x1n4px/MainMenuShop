import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordAfterLoginComponent } from './pages/change-password-after-login/change-password-after-login.component';
import { ChangePassNoLoginComponent } from './pages/change-pass-no-login/change-pass-no-login.component';
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
 import { RecuperarTicketComponent } from './pages/dialogs/recuperar-ticket/recuperar-ticket.component';
import { ConsultarTicketComponent } from './pages/dialogs/consultar-ticket/consultar-ticket.component';
import { DatosArticuloComponent } from './pages/dialogs/datos-articulo/datos-articulo.component';
import { DatosClienteComponent } from './pages/dialogs/datos-cliente/datos-cliente.component';
import { PagoComponent } from './pages/dialogs/pago/pago.component';
import { CierreCajaComponent } from './pages/dialogs/cierre-caja/cierre-caja.component';
import { RetiradaEfectivoComponent } from './pages/dialogs/retirada-efectivo/retirada-efectivo.component';
import { DevolucionDineroComponent } from './pages/dialogs/devolucion-dinero/devolucion-dinero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    ChangePasswordAfterLoginComponent,
    ChangePassNoLoginComponent,
    EditUserComponent,
    AlmacenComponent,
     RecuperarTicketComponent,
    ConsultarTicketComponent,
    DatosArticuloComponent,
    DatosClienteComponent,
    PagoComponent,
    CierreCajaComponent,
    RetiradaEfectivoComponent,
    DevolucionDineroComponent
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
  exports:[UserDashboardComponent]
})
export class AppModule { }
