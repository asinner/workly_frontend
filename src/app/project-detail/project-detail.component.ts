import { Component, OnInit } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { ProjectStore } from '../stores/project.store';
import { Project } from '../data';  
import { Subscription } from 'rxjs/Subscription'
import { AppStore } from '../app.store';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  private appStoreSub: Subscription;
  private projectStoreSub: Subscription;

  private project: Project;

  constructor(
    private userStore: UserStore, 
    private appStore: AppStore, 
    private projectStore: ProjectStore) { }

  ngOnInit() {
    this.appStoreSub = this.appStore.change.subscribe(this.getState.bind(this))
    this.projectStoreSub = this.projectStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private getState() {
    this.project = this.projectStore.getProject(this.appStore.getCurrentProjectId());
  }
}
