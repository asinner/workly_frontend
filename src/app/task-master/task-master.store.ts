import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { Task } from '../data';
import { TaskMasterItemCompleteMsg, TaskMasterItemUncompleteMsg } from '../task-master-item/task-master-item.actions';
import { ApiService, CompleteTaskReq, UncompleteTaskReq } from '../services/api.service';
import { TaskStore } from '../stores/task.store';

@Injectable()
export class TaskMasterStore extends FluxStore {
    private taskIds: number[] = [1,2,3,4,5,6,7,9,10];

    public getTaskIds() {
        return this.taskIds;
    }

    constructor(protected dispatcher: Dispatcher, private api: ApiService, private taskStore: TaskStore) {
        super(dispatcher);
    }

    private handleTaskMasterItemComplete(msg: TaskMasterItemCompleteMsg, action: Action) {
        let req: CompleteTaskReq = {id: msg.id}
        let task = this.taskStore.getTask(msg.id)
        // NOTE(andrews): Optimistic completion
        task.completed = true
        this.api.completeTask(req, action);
    }

    private handleTaskMasterItemUncomplete(msg: TaskMasterItemUncompleteMsg, action: Action) {
        let req: UncompleteTaskReq = {id: msg.id}
        let task = this.taskStore.getTask(msg.id)
        // NOTE(andrews): Optimistic completion
        task.completed = false
        this.api.uncompleteTask(req, action);
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.TaskMasterItemUncomplete:
                this.handleTaskMasterItemUncomplete(payload, action)
                this.emitChange();
                break;
                
            case ActionType.TaskMasterItemComplete:
                this.handleTaskMasterItemComplete(payload, action)
                this.emitChange();
                break;
        }
    }
}