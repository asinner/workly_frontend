import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { SignupSubmitMsg } from './signup.actions';
import { ApiService, ApiCreateUserSuccessMsg } from '../services/api.service';

@Injectable()
export class SignupStore extends FluxStore {
    constructor(protected dispatcher: Dispatcher, private api: ApiService, private router: Router) {
        super(dispatcher);
    }

    private handleSignupSubmit(msg: SignupSubmitMsg, context: Action) {
        this.api.createUser(msg.req, context)
    }

    private handleApiCreateUserSuccess(msg: ApiCreateUserSuccessMsg) {
        if (msg.context.type !== ActionType.SignupSubmit) return;
        this.router.navigate(['/confirm'], {queryParams: {email: msg.resp.user.email}});
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateUserSuccess:
                this.handleApiCreateUserSuccess(payload);
                this.emitChange();
                break;
            case ActionType.SignupSubmit:
                this.handleSignupSubmit(payload, action);
                this.emitChange();
                break;
        }
    }
}