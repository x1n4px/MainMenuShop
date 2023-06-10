import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PerroComponent } from './component/familia/perro/perro.component';
import { GatoComponent } from './component/familia/gato/gato.component';
import { BusquedaTiendaComponent } from './otros/busqueda-tienda/busqueda-tienda.component';
import { CestaComponent } from './usuario/cesta/cesta.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { LoginComponent } from './usuario/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'perro', component: PerroComponent },
  { path: 'gato', component: GatoComponent },
  { path: 'busquedaTienda', component: BusquedaTiendaComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
