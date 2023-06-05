import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from 'src/app/class/ticket';
import { LoginServiceService } from 'src/app/login-service.service';

@Component({
  selector: 'app-importe-dia',
  templateUrl: './importe-dia.component.html',
  styleUrls: ['./importe-dia.component.css']
})
export class ImporteDiaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImporteDiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginServiceService
  ) {

  }

  tickets: Ticket[] = [];
  importe:number = 0;

  ngOnInit(): void {
     this.calcular();
  }



  calcular() {
     this.loginService.obtenerImporteDia().subscribe(
      importe => {
        this.importe = importe;
        console.log(this.tickets);
      },
      error => {
        console.log("Error al obtener el importe:", error);
      }
    );
  }

}

