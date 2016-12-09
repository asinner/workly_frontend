import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToSignup() {
    this.router.navigate(['signup']);
  }

}
