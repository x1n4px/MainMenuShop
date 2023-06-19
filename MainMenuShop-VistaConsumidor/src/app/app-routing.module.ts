import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PerroComponent } from './component/familia/perro/perro.component';
 import { BusquedaTiendaComponent } from './otros/busqueda-tienda/busqueda-tienda.component';
import { CestaComponent } from './usuario/cesta/cesta.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { LoginComponent } from './usuario/login/login.component';
import { ProductoComponent } from './component/familia/producto/producto.component';
import { GatoComponent } from './component/familia/gato/gato.component';
 import { FamiliasComponent } from './component/familia/familias/familias.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gato2', component: GatoComponent },
  { path: 'perro2', component: PerroComponent },
  { path: 'busquedaTienda', component: BusquedaTiendaComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'cuenta/perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'producto/:id/:titulo', component: ProductoComponent, pathMatch:'full'},
  { path: ':familia', component: FamiliasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
