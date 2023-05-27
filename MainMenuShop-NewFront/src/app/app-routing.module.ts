import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './component/menu-principal/menu-principal.component';
import { AppComponent } from './app.component';
import { LoginMenuComponent } from './component/login-menu/login-menu.component';

const routes: Routes = [
  { path: '', component: LoginMenuComponent },
  { path: 'menuPrincipal', component: MenuPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
