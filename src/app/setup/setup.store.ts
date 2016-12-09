import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { ApiService, ApiCreateAccountSuccessMsg, CreateAccountReq } from '../services/api.service'
import { SetupSubmitMsg } from './setup.actions';

@Injectable()
export class SetupStore extends FluxStore {
    private currentUserID: number;

    constructor(protected dispatcher: Dispatcher, private api: ApiService, private router: Router) {
        super(dispatcher);
    }

    private handleSetupSubmit(msg: SetupSubmitMsg, action: Action) {
        let req: CreateAccountReq = {name: msg.name};
        this.api.createAccount(req, action);
    }

    private handleApiCreateAccountSuccessMsg(msg: ApiCreateAccountSuccessMsg, action: Action) {
        this.router.navigate(['project', 'latest']);
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateAccountSuccess:
                this.handleApiCreateAccountSuccessMsg(payload, action);
                this.emitChange();
                break;
                
            case ActionType.SetupSubmit:
                this.handleSetupSubmit(payload, action);
                this.emitChange();
                break;
        }
    }
}