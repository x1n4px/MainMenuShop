import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginServiceService } from 'src/app/login-service.service';
import { PasswordresetComponent } from 'src/app/modals/passwordreset/passwordreset.component';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {

  loginData = {
    "email": "",
    "password": ""
  }
  form: FormGroup = new FormGroup({});
  emailP: string = '';
  olvidada: boolean = false;
  error: boolean = false;
  accion: "creado" | "existente" | "401L" | "401R" | undefined ;
  token: string = "";
  isBordered: boolean = false;

  constructor(public loginService: LoginServiceService, private route: Router, public dialog: MatDialog, private snack: MatSnackBar) { }
  ngOnInit(): void {
    console.log(this.accion);
  }

  openDialog() {
    this.route.navigate(['/menuPrincipal']);

    //const dialogRef = this.dialog.open(LoginComponent, { data: {} });
  }

  openDialogReset(datos: any) {
    const dialogRef = this.dialog.open(PasswordresetComponent, { data: { contrasena: datos } });
  }

  formSubmit() {
   this.accion = undefined;
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.error = false;
        console.log(data.token)
        this.loginService.loginUser(data.token);
        this.token = data.token;
        this.openDialog();
        this.isBordered = false;
      },
      (error) => {
        console.log(error);
        this.error = true;
        this.accion = "401L";
        this.isBordered = true;
      }
    );
  }


  formSubmitReset() {
    this.accion = undefined;
    this.loginService.requestNewPassword(this.emailP).subscribe(
      (data: any) => {
        console.log(data.nuevaContrasena);
        this.error = false;
        if (data.nuevaContrasena != null) {
          this.openDialogReset(data.nuevaContrasena);
        } else if (data.nuevaContrasena === null) {
          this.error = true;
        }
      }
    );
  }



  crearUsuario() {
    const loginRegister: any = {
      "password": "test",
      "nombre": null,
      "apellido1": null,
      "apellido2": null,
      "roles": [
          "VICERRECTORADO"
      ],
      "email": "test"
    };


    this.loginService.crearUsuario(loginRegister).subscribe(
      (data:any) => {
        this.accion = "creado";
      },
      (error) => {
        if(error.status == 401) {
        this.accion = "401R";
        }
      }
    );
  }

}
