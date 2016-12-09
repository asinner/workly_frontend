import { Component, OnInit } from '@angular/core';
import { Account, User } from '../data';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './app-navbar-menu.component.html',
  styleUrls: ['./app-navbar-menu.component.css']
})
export class AppNavbarMenuComponent implements OnInit {
  private account: Account = {id: 1, name: 'Teamious.com'}

  constructor() { }

  ngOnInit() {
  }

}
