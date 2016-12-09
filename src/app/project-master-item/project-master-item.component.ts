import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../data';
import { ProjectMasterItemActions } from './project-master-item.actions';
import { ProjectStore } from '../stores/project.store';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'project-master-item',
  templateUrl: './project-master-item.component.html',
  styleUrls: ['./project-master-item.component.css']
})
export class ProjectMasterItemComponent implements OnInit {
  @Input() id: number;
  private projectStoreSub: Subscription;
  private project: Project;

  constructor(private actions: ProjectMasterItemActions, private projectStore: ProjectStore, private router: Router) {}

  ngOnInit() {
    this.projectStoreSub = this.projectStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  getState() {
    this.project = this.projectStore.getProject(this.id)
  }

  goToProject() {
    this.router.navigate(['projects', this.id])
  }
}
