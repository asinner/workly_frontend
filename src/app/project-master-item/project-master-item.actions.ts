import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { Project } from '../data';
import { ActionType } from '../flux/action-type';

@Injectable()
export class ProjectMasterItemActions {
    constructor(private dispatcher: Dispatcher) {}

    dragStart(project: Project) {
        let payload: ProjectMasterItemDragStartMsg = {project}
        this.dispatcher.dispatch({
            type: ActionType.ProjectMasterItemDragStart,
            payload
        })
    }

    dragEnter(project: Project) {
        let payload: ProjectMasterItemDragEnterMsg = {project}
        this.dispatcher.dispatch({
            type: ActionType.ProjectMasterItemDragEnter,
            payload
        })
    }

    dragEnd(project: Project) {
        let payload: ProjectMasterItemDragEndMsg = {project}
        this.dispatcher.dispatch({
            type: ActionType.ProjectMasterItemDragEnd,
            payload
        })
    }
}

export interface ProjectMasterItemDragStartMsg {
    project: Project
}

export interface ProjectMasterItemDragEnterMsg {
    project: Project
}

export interface ProjectMasterItemDragEndMsg {
    project: Project
}
