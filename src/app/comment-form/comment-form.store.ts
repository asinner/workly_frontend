import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { ApiService, CreateCommentReq} from '../services/api.service';
import { CommentFormSubmitMsg, CommentFormUpdateBodyMsg } from './comment-form.actions';

@Injectable()
export class CommentFormStore extends FluxStore {
    private body: string;

    public getBody() {
        return this.body;
    }

    constructor(protected dispatcher: Dispatcher, private api: ApiService) {
        super(dispatcher);
    }

    private handleCommentFormSubmit(payload: CommentFormSubmitMsg, action: Action) {
        let req: CreateCommentReq = {task_id: payload.task_id, body: payload.body}
        this.body = '';
        this.api.createComment(req, action);
    }
    
    private handleCommentFormUpdateBodyMsg(payload: CommentFormUpdateBodyMsg, action: Action) {
        this.body = payload.body;
    }

    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.CommentFormUpdateBody:
                this.handleCommentFormUpdateBodyMsg(payload, action)
                this.emitChange();
                break;

            case ActionType.CommentFormSubmit:
                this.handleCommentFormSubmit(payload, action);
                this.emitChange();
                break;
        }
    }
}