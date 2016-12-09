import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { Account, AccountMap } from '../data';
import { ApiService, ApiGetAccountsSuccessMsg, ApiCreateAccountSuccessMsg } from '../services/api.service';
import { toArray } from '../utils/toArray';

@Injectable()
export class AccountStore extends FluxStore {
    private accounts: AccountMap = {};

    public getAccounts() {
        return this.accounts;
    }

    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher)
    }

    private handleApiGetAccountsSuccess(msg: ApiGetAccountsSuccessMsg, action: Action) {
        for (let id in msg.resp.accounts) {
            this.accounts[id] = msg.resp.accounts[id];
        }
    }

    private handleApiCreateAccountSuccess(msg: ApiCreateAccountSuccessMsg, action: Action) {
        this.accounts[msg.resp.account.id] = msg.resp.account;
    }

    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateAccountSuccess:
                this.handleApiCreateAccountSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetAccountsSuccess:
                this.handleApiGetAccountsSuccess(payload, action);
                this.emitChange();
                break;
        }
    }
}