import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PerroComponent } from './component/familia/perro/perro.component';
import { GatoComponent } from './component/familia/gato/gato.component';

const routes: Routes = [
 { path: '', component: HomeComponent},
 {  path:'perro', component: PerroComponent},
 {  path:'gato', component: GatoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
