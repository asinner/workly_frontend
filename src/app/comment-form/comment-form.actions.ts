import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class CommentFormActions {
    constructor(private dispatcher: Dispatcher) {}

    updateBody(body: string) {
        let payload: CommentFormUpdateBodyMsg = {body}
        this.dispatcher.dispatch({
            type: ActionType.CommentFormUpdateBody,
            payload
        })
    }

    submit(task_id: number, body: string) {
        let payload: CommentFormSubmitMsg = {task_id, body}
        this.dispatcher.dispatch({
            type: ActionType.CommentFormSubmit,
            payload
        });
    }
}

export interface CommentFormUpdateBodyMsg {
    body: string;
}

export interface CommentFormSubmitMsg {
    task_id: number;
    body: string;
}
