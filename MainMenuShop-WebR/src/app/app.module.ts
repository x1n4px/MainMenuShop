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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
