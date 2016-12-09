import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class ProjectDetailActions {
    constructor(private dispatcher: Dispatcher) {}

    init() {
        let payload: ProjectDetailInit = {}
        this.dispatcher.dispatch({
            type: ActionType.ProjectDetailInit,
            payload
        });
    }
}

export interface ProjectDetailInit {}

