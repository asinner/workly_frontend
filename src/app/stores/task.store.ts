import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { Task, TaskPriority } from '../data';
import { 
    ApiGetTaskSuccessMsg, 
    ApiCreateTaskSuccessMsg, 
    ApiGetTasksSuccessMsg,
    ApiUpdateTaskSuccessMsg,
    ApiDeleteTaskSuccessMsg } from '../services/api.service'

@Injectable()
export class TaskStore extends FluxStore {
    private tasks: TaskMap = {}

    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher)
    }

    public getTask(id): Task {
        return this.tasks[id]
    }

    public getTasks() {
        return this.tasks;
    }

    private handleCreateTaskSuccessMsg(msg: ApiCreateTaskSuccessMsg) {
        let task = msg.resp.task;
        this.tasks[task.id] = task;
    }

    private handleApiGetTaskSuccessMsg(msg: ApiGetTaskSuccessMsg) {
        let task = msg.resp.task
        this.tasks[task.id]
    }

    private handleGetTasksSuccessMsg(msg: ApiGetTasksSuccessMsg, action: Action) { 
        let tasks = msg.resp.tasks
        for (let id in tasks) {
            this.tasks[id] = tasks[id];
        }
    }

    private handleApiUpdateTaskSuccessMsg(msg: ApiUpdateTaskSuccessMsg, action: Action) {
        this.tasks[msg.resp.task.id] = msg.resp.task;
    }

    private handleApiDeleteTaskSuccessMsg(msg: ApiDeleteTaskSuccessMsg, action: Action) {
        this.tasks[msg.resp.id] = undefined;   
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiDeleteTaskSuccess:
                this.handleApiDeleteTaskSuccessMsg(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiUpdateTaskSuccess:
                this.handleApiUpdateTaskSuccessMsg(payload, action);
                this.emitChange();
                break;
                
            case ActionType.ApiGetTasksSuccess:
                this.handleGetTasksSuccessMsg(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiCreateTaskSuccess:
                this.handleCreateTaskSuccessMsg(payload);
                this.emitChange();
                break;
            case ActionType.ApiGetTaskSuccess:
                this.handleApiGetTaskSuccessMsg(payload)
                this.emitChange();
                break;
        }
    }
}

interface TaskMap {
    [id:number]: Task
}