import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class SetupActions {
    constructor(private dispatcher: Dispatcher) {}

    submit(name: string) {
        let payload: SetupSubmitMsg = {name}
        this.dispatcher.dispatch({
            type: ActionType.SetupSubmit,
            payload
        })
    }
}

export interface SetupSubmitMsg {
    name: string;
}