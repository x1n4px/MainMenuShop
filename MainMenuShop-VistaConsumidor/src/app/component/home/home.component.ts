import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void {


  }








}
