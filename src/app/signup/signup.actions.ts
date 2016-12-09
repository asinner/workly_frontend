import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { Project } from '../data';
import { ActionType } from '../flux/action-type';
import { CreateUserReq } from '../services/api.service';

@Injectable()
export class SignupActions {
    constructor(private dispatcher: Dispatcher) {}

    submit(req: CreateUserReq) {
        let payload: SignupSubmitMsg = {req}
        this.dispatcher.dispatch({
            type: ActionType.SignupSubmit,
            payload
        })
    }
}


export interface SignupSubmitMsg {
    req: CreateUserReq
}