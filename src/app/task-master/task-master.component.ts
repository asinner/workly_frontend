import { Component, OnInit } from '@angular/core';
import { Task } from '../data';
import { AppStore } from '../app.store';
import { TaskMasterStore } from './task-master.store';

@Component({
  selector: 'task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.css']
})
export class TaskMasterComponent implements OnInit {
  private taskIds: number[] = [];

  // NOTE(andrews): TaskMasterStore imported needed for side effects 
  constructor(private appStore: AppStore, private taskMasterStore: TaskMasterStore) {
  }

  ngOnInit() {
    this.appStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private getState() {
    this.taskIds = this.appStore.getCurrentTaskIds();
  }
}
