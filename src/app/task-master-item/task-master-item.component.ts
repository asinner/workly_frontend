import { Component, OnInit, Input } from '@angular/core';
import { TaskStore } from '../stores/task.store';
import { UserStore } from '../stores/user.store';
import { TaskMasterItemActions } from './task-master-item.actions';
import { Subscription } from 'rxjs/Rx';
import { Task, User } from '../data';
import { Router } from '@angular/router';

@Component({
  selector: 'task-master-item',
  templateUrl: './task-master-item.component.html',
  styleUrls: ['./task-master-item.component.css']
})
export class TaskMasterItemComponent implements OnInit {
  @Input() id: number;
  private taskStoreSub: Subscription;
  private task: Task;
  private assignee: User;
  
  constructor(
    private router: Router,
    private actions: TaskMasterItemActions, 
    private taskStore: TaskStore, 
    private userStore: UserStore) { }

  ngOnInit() {
    this.taskStoreSub = this.taskStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private goToTask() {
    this.router.navigate(['task', this.id])
  }

  private change() {
  }

  private toggleTaskCompletion(e: MouseEvent) {
    e.stopPropagation();
    if (this.task.completed) {
      this.actions.uncomplete(this.id)
    } else {
      this.actions.complete(this.id)
    }
  }


  private getState() {
    this.task = this.taskStore.getTask(this.id);
    // if (this.task) this.assignee = this.userStore.getUser(this.task.assignee_id);
  }
}
