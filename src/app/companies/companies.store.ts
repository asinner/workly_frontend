import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { ApiService, CreateAccountReq, ApiCreateAccountSuccessMsg } from '../services/api.service';
import { SubmitCompanyFormMsg } from './companies.actions';

@Injectable()
export class CompaniesStore extends FluxStore {
    private showKey: ShowKey = ShowKey.Step1;

    public getShowKey() {
        return this.showKey;
    }

    constructor(protected dispatcher: Dispatcher, private api: ApiService) {
        super(dispatcher);
    }

    private handleCompaniesSubmitCompanyFormMsg(msg: SubmitCompanyFormMsg, context: Action) {
        let req: CreateAccountReq = {name: msg.name}
        this.api.createAccount(req, context)
    }

    private handleApiCreateAccountSuccessMsg(msg: ApiCreateAccountSuccessMsg) {
        if (msg.context.type !== ActionType.CompaniesSubmitCompanyForm) return;
        this.showKey = ShowKey.Step2;
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateAccountSuccess:
                this.handleApiCreateAccountSuccessMsg(payload)
                this.emitChange();
                break;
            case ActionType.CompaniesSubmitCompanyForm:
                this.handleCompaniesSubmitCompanyFormMsg(payload, action);
                this.emitChange();
                break;
        }
    }

}


export enum ShowKey {
  Step1,
  Step2,
  Step3
}