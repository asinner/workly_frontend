import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, User, ProjectMap, Project } from '../data';
import { AppNavbarActions } from './app-navbar.actions';
import { AppNavbarStore } from './app-navbar.store';
import { Subscription } from 'rxjs/Rx';
import { AuthStore } from '../stores/auth.store';
import { AppStore } from '../app.store';
import { UserStore } from '../stores/user.store';
import { ProjectStore } from '../stores/project.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  private loggedIn: boolean;
  private appNavbarStoreSub: Subscription;
  private authStoreSub: Subscription;
  private appStoreSub: Subscription;
  private userStoreSub: Subscription;
  private projectStoreSub: Subscription;
  private currentProject: Project;
  private currentUser: User;
  private projects: ProjectMap;

  constructor(private actions: AppNavbarActions, 
    private appNavbarStore: AppNavbarStore,
    private authStore: AuthStore, 
    private userStore: UserStore,
    private projectStore: ProjectStore,
    private appStore: AppStore,
    private router: Router) {}

  ngOnInit() {
    this.appNavbarStoreSub = this.appNavbarStore.change.subscribe(this.getState.bind(this))
    this.authStoreSub = this.authStore.change.subscribe(this.getState.bind(this))
    this.userStoreSub = this.userStore.change.subscribe(this.getState.bind(this))
    this.projectStoreSub = this.projectStore.change.subscribe(this.getState.bind(this))
    this.appStoreSub = this.appStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private getState() {
    this.loggedIn = this.authStore.hasUserToken();
    this.currentUser = this.userStore.getUser(this.authStore.getCurrentUserId());
    this.projects = this.projectStore.getProjectsArray()   
    this.currentProject = this.projectStore.getProject(this.appStore.getCurrentProjectId())
  }

  private goToLogout() {
    this.actions.logout();
  }

  private goToHome() {
    let route = this.loggedIn ? '/project/latest' : ''
    this.router.navigate([route])
  }

  private goToProject(id) {
    this.actions.switchProject(id);
  }

  private goToLogin() {
    this.router.navigate(['/login']);
  }

  private goToSignup() {
    this.router.navigate(['/signup']);
  }
}
