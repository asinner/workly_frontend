import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class NewTaskActions {
    constructor(private dispatcher: Dispatcher) {}

    submit(title: string) {
        let payload: NewTaskSubmitMsg = {title}
        this.dispatcher.dispatch({
            type: ActionType.NewTaskSubmit,
            payload
        })
    }

    changeTitle(title: string) {
        let payload: NewTaskChangeTitle = {title}
        this.dispatcher.dispatch({
            type: ActionType.NewTaskChangeTitle,
            payload
        })
    }
}


export interface NewTaskSubmitMsg {
    title: string;
}

export interface NewTaskChangeTitle {
    title: string;
}