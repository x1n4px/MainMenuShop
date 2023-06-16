import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  tituloProducto: any;

  constructor(private route:ActivatedRoute , private router:Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tituloProducto = params['titulo'];
      // Utiliza el título del producto como desees
    });
  }

}
