import { Component, OnInit } from '@angular/core';
import { SetupActions } from './setup.actions';
import { SetupStore } from './setup.store';

@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(private actions: SetupActions, private setupStore: SetupStore) { }

  ngOnInit() {
  }

  submit(event: any, name: string) {
    event.preventDefault();
    this.actions.submit(name);
  }

}
