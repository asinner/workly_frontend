import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';

@Injectable()
export class LoginActions {
    constructor(private dispatcher: Dispatcher) {}

    submit(email: string, password: string) {
        let payload: LoginSubmitMsg = {email, password}
        this.dispatcher.dispatch({
            type: ActionType.LoginSubmit,
            payload
        });
    }
}

export interface LoginSubmitMsg {
    email: string,
    password: string
}
