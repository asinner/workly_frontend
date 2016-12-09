import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { AuthStore } from '../stores/auth.store';
import { LoginSubmitMsg } from './login.actions';
import { ApiService, ApiLoginUserSuccessMsg, ApiLoginUserErrorMsg } from '../services/api.service';

@Injectable()
export class LoginStore extends FluxStore {
    private loginErr: string = '';
    private isSubmitting: boolean = false;

    public getLoginErr() {
        return this.loginErr;
    }

    public getIsSubmitting() {
        return this.isSubmitting;
    }

    constructor(protected dispatcher: Dispatcher, 
        private api: ApiService, 
        private router: Router,
        private authStore: AuthStore) {
        super(dispatcher);
    }

    private handleLoginSubmitMsg(msg: LoginSubmitMsg, action: Action) {
        this.api.loginUser(msg, action);
        this.loginErr = '';
        this.isSubmitting = true;
    }
    private handleApiLoginUserSuccessMsg(msg: ApiLoginUserSuccessMsg) {
        if (msg.context.type !== ActionType.LoginSubmit) return
        this.dispatcher.waitFor([this.authStore.dispatchToken])
        this.isSubmitting = false;
        this.router.navigate(['/project/latest'])
    }
    private handleApiLoginUserErrorMsg(msg: ApiLoginUserErrorMsg) {
        if (msg.context.type !== ActionType.LoginSubmit) return
        this.loginErr = 'Invalid email/password'
        this.isSubmitting = false;
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiLoginUserError:
                this.handleApiLoginUserErrorMsg(payload)
                this.emitChange();
                break;
            case ActionType.ApiLoginUserSuccess:
                this.handleApiLoginUserSuccessMsg(payload)
                this.emitChange();
                break;
            case ActionType.LoginSubmit:
                this.handleLoginSubmitMsg(payload, action)
                this.emitChange();
                break;
        }
    }
}