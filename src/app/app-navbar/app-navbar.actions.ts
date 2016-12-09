import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { Project } from '../data';
import { ActionType } from '../flux/action-type';

@Injectable()
export class AppNavbarActions {
    constructor(private dispatcher: Dispatcher) {}

    logout() {
        let payload: AppNavbarLogoutMsg = {}
        this.dispatcher.dispatch({
            type: ActionType.AppNavbarLogout,
            payload
        })
    }

    switchProject(projectId: number) {
        let payload: AppNavbarSwitchProjectMsg = {projectId}
        this.dispatcher.dispatch({
            type: ActionType.AppNavbarSwitchProject,
            payload
        })
    }
}

export interface AppNavbarLogoutMsg {}

export interface AppNavbarSwitchProjectMsg {
    projectId: number;
}