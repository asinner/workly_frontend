import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { Task } from '../data';
import { ActionType } from '../flux/action-type';

@Injectable()
export class TaskMasterItemActions {
    constructor(private dispatcher: Dispatcher) {}

    complete(id: number) {
        let payload: TaskMasterItemCompleteMsg = {id}
        this.dispatcher.dispatch({
            type: ActionType.TaskMasterItemComplete,
            payload
        })
    }

    uncomplete(id: number) {
        let payload: TaskMasterItemUncompleteMsg = {id}
        this.dispatcher.dispatch({
            type: ActionType.TaskMasterItemUncomplete,
            payload
        })
    }
}

export interface TaskMasterItemCompleteMsg {
    id: number;
}

export interface TaskMasterItemUncompleteMsg {
    id: number;
}