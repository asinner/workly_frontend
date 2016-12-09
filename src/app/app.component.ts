import { Component } from '@angular/core';
import { AppActions } from './app.actions';
import { AppStore } from './app.store';
import { TaskStore } from './stores/task.store';
import { ProjectStore } from './stores/project.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private actions: AppActions, private appStore: AppStore, private taskStore: TaskStore, private projectStore: ProjectStore) {}

  ngOnInit() {
    this.actions.init();
  }
}
