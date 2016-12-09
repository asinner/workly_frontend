import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { Project, ProjectMap} from '../data';
import { ApiService, ApiGetProjectsSuccessMsg } from '../services/api.service';
import { AppNavbarLogoutMsg } from '../app-navbar/app-navbar.actions';
import { toArray } from '../utils/toArray';

@Injectable()
export class ProjectStore extends FluxStore {
    private projects: ProjectMap = {};

    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher)
    }

    public getProject(id) {
        return this.projects[id]
    }

    public getProjects(): ProjectMap {
        return this.projects;
    }

    public getProjectsArray(): Project[] {
        return toArray(this.projects);
    }

    private handleApiGetProjectsSuccessMsg(msg: ApiGetProjectsSuccessMsg, action: Action) {
        let projects = msg.resp.projects;
        for (let id in projects) {
            this.projects[id] = projects[id];
        }
    }

    private handleAppNavbarLogoutMsg(msg: AppNavbarLogoutMsg, action: Action) {
        this.projects = {};
    }

    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.AppNavbarLogout:
                this.handleAppNavbarLogoutMsg(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetProjectsSuccess:
                this.handleApiGetProjectsSuccessMsg(payload, action);                
                this.emitChange();
                break;
        }
    }
}