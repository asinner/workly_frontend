import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { TaskIdChangedMsg, TaskDetailUpdateTaskMsg, TaskDetailDeleteTaskMsg, TaskDetailPresignMsg } from './task-detail.actions';
import { TaskStore } from '../stores/task.store';
import { Router } from '@angular/router';
import { 
    ApiService,
    ApiListCommentsSuccessMsg,
    ApiDeleteTaskSuccessMsg,
    GetTaskReq,
    UpdateTaskReq,
    DeleteTaskReq,
    ListCommentsReq,
    ApiCreateCommentSuccessMsg,
    ApiCreatePresignedPostSuccessMsg } from '../services/api.service';
import { toArray } from '../utils/toArray';

@Injectable()
export class TaskDetailStore extends FluxStore {
    private commentIds: number[] = [];

    public getCommentIds() {
        return this.commentIds;
    }

    constructor(protected dispatcher: Dispatcher, private taskStore: TaskStore, private api: ApiService, private router: Router) {
        super(dispatcher);
    }

    private handleTaskDetailTaskIdChanged(msg: TaskIdChangedMsg, action: Action) {
        let task = this.taskStore.getTask(msg.id);
        if (!task) {
            let req: GetTaskReq = {id: msg.id}
            this.api.getTask(req, action)
        }
        let listCommentsReq: ListCommentsReq = {task_id: msg.id}
        this.api.listComments(listCommentsReq, action);
    }

    private handleApiListCommentsSuccess(msg: ApiListCommentsSuccessMsg, action: Action) {
        if (msg.context && msg.context.type === ActionType.TaskDetailTaskIdChanged) {
            this.commentIds = toArray(msg.resp.comments).map((c) => c.id);
        }
    }

    private handleApiCreateCommentSuccess(msg: ApiCreateCommentSuccessMsg, action: Action) {
        this.commentIds.push(msg.resp.comment.id) 
    }

    private handleTaskDetailUpdateTask(msg: TaskDetailUpdateTaskMsg, action: Action) {
        let req: UpdateTaskReq = msg;
        this.api.updateTask(msg, action);
    }

    private handleTaskDetailDeleteTask(msg: TaskDetailDeleteTaskMsg, action: Action) {
        let req: DeleteTaskReq = msg;
        this.api.deleteTask(msg, action);
    }

    private handleApiDeleteTaskSuccess(msg: ApiDeleteTaskSuccessMsg, action: Action) {
        let i = this.commentIds.indexOf(msg.resp.id);
        let ids = this.commentIds.slice();
        if (i > -1) ids.splice(i);
        this.commentIds = ids;
        this.router.navigate(['project', 'latest'])
    }

    private handleTaskDetailPresign(msg: TaskDetailPresignMsg, action: Action) {
        this.api.createPresignedPost({content_length: msg.file.size}, action);
    }

    private handleApiCreatePresignedPostSuccess(msg: ApiCreatePresignedPostSuccessMsg, action: Action) {
        if (msg.context && msg.context.type !== ActionType.TaskDetailPresign) return; 
        let context: TaskDetailPresignMsg = msg.context.payload;
        this.api.uploadToS3({file: context.file, presigned_url: msg.resp.url}, msg.context);
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiCreatePresignedPostSuccess:
                this.handleApiCreatePresignedPostSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.TaskDetailPresign:
                this.handleTaskDetailPresign(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiDeleteTaskSuccess:
                this.handleApiDeleteTaskSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.TaskDetailDeleteTask:
                this.handleTaskDetailDeleteTask(payload, action);
                this.emitChange();
                break;

            case ActionType.TaskDetailUpdateTask:
                this.handleTaskDetailUpdateTask(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiCreateCommentSuccess:
                this.handleApiCreateCommentSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiListCommentsSuccess:
                this.handleApiListCommentsSuccess(payload, action);
                this.emitChange();
                break;
            case ActionType.TaskDetailTaskIdChanged:
                this.handleTaskDetailTaskIdChanged(payload, action)
                this.emitChange();
                break;
        }
    }
}