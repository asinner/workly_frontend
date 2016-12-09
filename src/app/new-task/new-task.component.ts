import { Component, OnInit } from '@angular/core';
import { NewTaskActions } from './new-task.actions';
import { NewTaskStore } from './new-task.store';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  private taskTitle: string = '';
  private newTaskStoreSub: Subscription;

  constructor(
    private actions: NewTaskActions, 
    private newTaskStore: NewTaskStore) { }

  submit(event, v: string = '') {
    if (v.trim() === '') return;
    this.actions.submit(v);
  }

  onKeypress(title: string) {
    this.actions.changeTitle(title)
  }
  
  ngOnInit() {
    this.newTaskStoreSub = this.newTaskStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private getState() {
    this.taskTitle = this.newTaskStore.getNewTaskTitle();
  }

}
