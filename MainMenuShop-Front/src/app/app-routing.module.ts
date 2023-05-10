import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component'; 

const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
    pathMatch : 'full'
  }, 
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },  
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
  }, 
  {
    path:'editUser/:id',
    component:EditUserComponent,
    pathMatch:'full'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
