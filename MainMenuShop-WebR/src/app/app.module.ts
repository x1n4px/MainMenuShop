import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PerroComponent } from './component/familia/perro/perro.component';
import { GatoComponent } from './component/familia/gato/gato.component';
import { BusquedaTiendaComponent } from './otros/busqueda-tienda/busqueda-tienda.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { LoginComponent } from './usuario/login/login.component';
import { CestaComponent } from './usuario/cesta/cesta.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BusquedaArticulosComponent } from './component/modal/busqueda-articulos/busqueda-articulos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ProductoComponent } from './component/familia/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
   @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PerroComponent,
    GatoComponent,
    BusquedaTiendaComponent,
    PerfilComponent,
    LoginComponent,
    CestaComponent,
    FooterComponent,
    BusquedaArticulosComponent,
    ProductoComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
