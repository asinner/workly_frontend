import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { NewTaskSubmitMsg, NewTaskChangeTitle} from './new-task.actions';
import { AppStore } from '../app.store'; 
import { ApiService, CreateTaskReq, ApiCreateTaskSuccessMsg } from '../services/api.service';
import { ProjectStore } from '../stores/project.store';

@Injectable()
export class NewTaskStore extends FluxStore {
    private newTaskTitle: string = '';

    public getNewTaskTitle() {
        return this.newTaskTitle;
    }

    constructor(protected dispatcher: Dispatcher, private api: ApiService, private appStore: AppStore, private projectStore: ProjectStore) {
        super(dispatcher);
    }

    private handleNewTaskSubmit(msg: NewTaskSubmitMsg, action: Action) {
        let project = this.projectStore.getProject(this.appStore.getCurrentProjectId())
        let req: CreateTaskReq = {
            title: msg.title, 
            project_id: project.id,
            account_id: project.account_id
        }
        this.api.createTask(req, action);
    }

    private handleNewTaskChangeTitle(msg: NewTaskChangeTitle, action: Action) {
        this.newTaskTitle = msg.title;
    }

    private handleCreateTaskSuccess(msg: ApiCreateTaskSuccessMsg, action: Action) {
        if (msg.context && msg.context.type !== ActionType.NewTaskSubmit) return;
        this.newTaskTitle = '';
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.NewTaskChangeTitle:
                this.handleNewTaskChangeTitle(payload, action)
                this.emitChange();
                break;

            case ActionType.ApiCreateTaskSuccess:
                this.handleCreateTaskSuccess(payload, action)
                this.emitChange();
                break;

            case ActionType.NewTaskSubmit:
                this.handleNewTaskSubmit(payload, action);
                this.emitChange();
                break;
        }
    }
}