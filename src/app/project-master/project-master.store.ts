import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { ProjectStore } from '../stores/project.store';
import { Project } from '../data';
import { ProjectMasterItemDragStartMsg, 
    ProjectMasterItemDragEndMsg, 
    ProjectMasterItemDragEnterMsg } from '../project-master-item/project-master-item.actions';

import { ProjectMasterSearchMsg } from './project-master.actions';

@Injectable()
export class ProjectMasterStore extends FluxStore {
    private projectIds: number[] = [1,2,3,4,5,6,7,9,10];

    public getProjectIds() {
        return this.projectIds;
    }

    constructor(protected dispatcher: Dispatcher, private projectStore: ProjectStore) {
        super(dispatcher);
    }

    private handleProjectMasterSearch(msg: ProjectMasterSearchMsg) {
        let projects = this.projectStore.getProjects();
        let res = []
        for (let i in projects) {
            let p = projects[i]
            if (p.name.toLocaleLowerCase().trim().indexOf(msg.query.toLocaleLowerCase().trim()) > -1) {
                res.push(i)
            }
        }
        this.projectIds = res;   
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ProjectMasterSearch:
                this.handleProjectMasterSearch(payload);
                break;
        }
        this.emitChange();
    }
}