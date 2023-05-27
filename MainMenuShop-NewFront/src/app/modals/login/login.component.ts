import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginServiceService } from 'src/app/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  
  token:any;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public loginService: LoginServiceService
    ) {

   }
  ngOnInit(){
    this.token = this.loginService.getToken();

  }
 
  

  public cerrarSesion() {
    this.loginService.logout();
    this.token = this.loginService.getToken();
    
   }
}
