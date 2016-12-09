import { Injectable } from '@angular/core';
import { Dispatcher } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { Invitation } from '../data';

@Injectable()
export class CompaniesActions {
    constructor(private dispatcher: Dispatcher) {}

    submitCompanyForm(name: string) {
        let payload: SubmitCompanyFormMsg = {name}
        this.dispatcher.dispatch({
            type: ActionType.CompaniesSubmitCompanyForm,
            payload
        })
    }

    submitInviteForm(invitations: Invitation[]) {
        let payload: SubmitInviteFormMsg = {invitations}
        this.dispatcher.dispatch({
            type: ActionType.CompaniesSubmitInviteForm,
            payload
        })
    }
}

export interface SubmitCompanyFormMsg {
    name: string
}

export interface SubmitInviteFormMsg {
    invitations: Invitation[]
}
