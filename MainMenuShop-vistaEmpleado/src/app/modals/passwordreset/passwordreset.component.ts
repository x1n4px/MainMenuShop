import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginServiceService } from 'src/app/login-service.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent {

  datos:any;
  constructor(
    public dialogRef: MatDialogRef<PasswordresetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.datos = data.contrasena;
   }
}
