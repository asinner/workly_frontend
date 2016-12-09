import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class ProjectMasterActions {
    constructor(private dispatcher: Dispatcher) {}

    search(query: string) {
        let payload: ProjectMasterSearchMsg = {query}
        this.dispatcher.dispatch({
            type: ActionType.ProjectMasterSearch,
            payload
        })
    }
}

export interface ProjectMasterSearchMsg {
    query: string
}
