import { Component, OnInit } from '@angular/core';
import { Project } from '../data'; 
import { ProjectMasterStore } from './project-master.store';
import { ProjectMasterActions } from './project-master.actions';

@Component({
  selector: 'project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.css']
})
export class ProjectMasterComponent implements OnInit {
  private projectIds: number[];
  private showNewProject: boolean = false;

  constructor(private projectMasterStore: ProjectMasterStore, private actions: ProjectMasterActions) {}

  ngOnInit() {
    this.projectMasterStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  getState() {
    this.projectIds = this.projectMasterStore.getProjectIds();
  }

  toggleNewProject() {
    this.showNewProject = !this.showNewProject;
  }

  search(q: string) {
    console.log('here...')
    this.actions.search(q)
  }
}
