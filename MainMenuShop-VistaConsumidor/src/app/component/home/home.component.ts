import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar, private router:Router) { }

  ngOnInit(): void {


  }


  go(route:string) {
    this.router.navigate(['', route]);
  }





}
