import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class TaskDetailActions {
    constructor(private dispatcher: Dispatcher) {}

    taskIdChanged(id: number) {
        let payload: TaskIdChangedMsg = {id}
        this.dispatcher.dispatch({
            type: ActionType.TaskDetailTaskIdChanged,
            payload
        })
    }

    updateTask(id: number, title: string, description: string) {
        let payload: TaskDetailUpdateTaskMsg = {id, title, description}
        this.dispatcher.dispatch({
            type: ActionType.TaskDetailUpdateTask,
            payload
        })
    }

    deleteTask(id: number) {
        let payload: TaskDetailDeleteTaskMsg = {id}
        this.dispatcher.dispatch({
            type: ActionType.TaskDetailDeleteTask,
            payload
        })
    }

    presign(file: File) {
        let payload: TaskDetailPresignMsg = {file}
        this.dispatcher.dispatch({
            type: ActionType.TaskDetailPresign,
            payload
        })
    }
}

export interface TaskDetailPresignMsg {
    file: File;
}
export interface TaskDetailDeleteTaskMsg {
    id: number;
}
export interface TaskDetailUpdateTaskMsg {
    id: number;
    title: string;
    description: string;
}

export interface TaskIdChangedMsg {
    id: number
}
