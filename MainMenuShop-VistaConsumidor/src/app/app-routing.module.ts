import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
 import { BusquedaTiendaComponent } from './otros/busqueda-tienda/busqueda-tienda.component';
import { CestaComponent } from './usuario/cesta/cesta.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { LoginComponent } from './usuario/login/login.component';
 import { FamiliasComponent } from './component/familia/familias/familias.component';
import { AuthGuard } from './class/AuthGuard';
import { PagoUsuarioComponent } from './usuario/pago-usuario/pago-usuario.component';
import { PagoSinUsuarioComponent } from './usuario/pago-sin-usuario/pago-sin-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
   { path: 'busquedaTienda', component: BusquedaTiendaComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'cuenta/perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
   { path: ':familia', component: FamiliasComponent },
  { path: 'cesta/pago', component: PagoUsuarioComponent },
  { path: 'cesta/pagoS', component: PagoSinUsuarioComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
