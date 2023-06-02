import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/class/producto';

@Component({
  selector: 'app-recuperar-ticket',
  templateUrl: './recuperar-ticket.component.html',
  styleUrls: ['./recuperar-ticket.component.css']
})
export class RecuperarTicketComponent {

  constructor(
    public dialogRef: MatDialogRef<RecuperarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.conjuntoDeCestas = data.conjuntoDeCestas;
    console.log(this.conjuntoDeCestas);
  }


  conjuntoDeCestas: any[][] = [];
  cesta: Producto[] = [];

  seleccionarTicket(ticketSeleccionado: any) {
    console.log(ticketSeleccionado);
    this.dialogRef.close(ticketSeleccionado);
  }

  cancelarSeleccion() {
    this.dialogRef.close(); // Cerrar el dialogo sin devolver ningún dato
  }
}
