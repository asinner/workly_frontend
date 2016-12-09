import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskPriority, UFile, User } from '../data';
import { TaskDetailActions } from './task-detail.actions';
import { Subscription } from 'rxjs/Rx';
import { TaskStore } from '../stores/task.store';
import { UserStore } from '../stores/user.store';
import { CommentStore } from '../stores/comment.store';
import { TaskDetailStore } from './task-detail.store';
import * as assign from 'object-assign';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  private taskId: number;
  private task: Task;
  private taskBuffer: Task;
  private assignee: User;
  private creator: User;
  private taskStoreSub: Subscription;
  private taskDetailStoreSub: Subscription;
  private routeSub: Subscription;
  private isDropping: boolean = false;
  private activeTaskId: number = 1;
  private editing: boolean = false;
  private commentIds: number[] = [];

  constructor(
    private userStore: UserStore,
    private route: ActivatedRoute, 
    private actions: TaskDetailActions, 
    private taskStore: TaskStore,
    private taskDetailStore: TaskDetailStore,
    private router: Router,
    private commentStore: CommentStore,
    private http: Http) {
  }

  ngOnDestroy() {
    this.taskStoreSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  private showEditor() {
    this.editing = true;
    this.taskBuffer = assign({}, this.task);
  }

  private hideEditor() {
    this.editing = false;
  }

  private saveTask() {
    this.editing = false;
  }

  private updateTask() {
    this.actions.updateTask(
      this.taskId,
      this.taskBuffer.title, 
      this.taskBuffer.description
    );
    this.editing = false;
  }

  private backToProject() {
    this.router.navigate(['project', 'latest'])
  }
 
  private getState() {
    this.task = this.taskStore.getTask(this.taskId);
    this.commentIds = this.taskDetailStore.getCommentIds();
    if (this.task) {
      this.assignee = this.userStore.getUser(this.task.assignee_id)
      this.creator = this.userStore.getUser(this.task.creator_id)
    }
  }

  private showFileViewer(input: HTMLInputElement) {
    input.click();
  }

  private deleteTask() {
    this.actions.deleteTask(this.taskId);
  }

  private filesChanged(event) {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file: File = files[i];
      this.actions.presign(file);
    }
  }

  ngOnInit() {
    this.taskStoreSub = this.taskStore.change.subscribe(this.getState.bind(this))
    this.taskDetailStoreSub = this.taskDetailStore.change.subscribe(this.getState.bind(this))
    this.routeSub = this.route.params.subscribe(params => {
      this.taskId = parseInt(params['taskId'])
      this.actions.taskIdChanged(this.taskId);
    });
    this.getState();
  }

  activateTask(task: Task) {
    this.activeTaskId = task.id; 
  }
}
