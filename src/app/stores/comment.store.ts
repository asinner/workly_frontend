import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { Comment, CommentMap } from '../data';
import { ApiService, ApiListCommentsSuccessMsg, ApiCreateCommentSuccessMsg } from '../services/api.service';
import { toArray } from '../utils/toArray';

@Injectable()
export class CommentStore extends FluxStore {
    private comments: CommentMap = {};

    public getComments(): CommentMap {
        return this.comments;
    }

    public getComment(id: number): Comment {
        return this.comments[id];
    }

    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher)
    }

    private handleApiListCommentsSuccess(msg: ApiListCommentsSuccessMsg, action: Action) {
        for (let id in msg.resp.comments) {
            this.comments[id] = msg.resp.comments[id];
        }
    }

    private handleApiCreateCommentSuccess(msg: ApiCreateCommentSuccessMsg, action: Action) {
        this.comments[msg.resp.comment.id] = msg.resp.comment;
    }
    
    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateCommentSuccess:
                this.handleApiCreateCommentSuccess(payload, action);
                this.emitChange();
                break;
            case ActionType.ApiListCommentsSuccess:
                this.handleApiListCommentsSuccess(payload, action);
                this.emitChange();
                break;
        }
    }
}