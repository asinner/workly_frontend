import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { ApiService, ApiLoginUserSuccessMsg, ApiGetUserSuccessMsg, ApiGetAccountTokenSuccessMsg } from '../services/api.service'
import { AppNavbarLogoutMsg } from '../app-navbar/app-navbar.actions';
import { AuthCookieService } from '../services/auth-cookie.service';

@Injectable()
export class AuthStore extends FluxStore {
    private currentUserID: number;

    constructor(protected dispatcher: Dispatcher, private authCookie: AuthCookieService, private api: ApiService) {
        super(dispatcher);
    }

    public getCurrentUserId(): number {
        return this.currentUserID;
    }

    public hasUserToken(): boolean {
        return !!this.getUserToken();
    }

    public getUserToken() {
        return this.authCookie.getUserToken();
    }

    private setUserToken(token: string) {
        this.authCookie.setUserToken(token)
    }

    private setAccountToken(token: string) {
        this.authCookie.setAccountToken(token);
    }

    private handleApiLoginUserSuccessMsg(msg: ApiLoginUserSuccessMsg, action: Action) {
        this.setUserToken(msg.token);
        this.api.getUser({}, action);
    }

    private handleAppNavbarLogout(msg: AppNavbarLogoutMsg, action: Action) {
        this.authCookie.deleteUserToken()
        this.currentUserID = null;
    }

    private handleApiGetUserSuccessMsg(msg: ApiGetUserSuccessMsg, action: Action) {
        if (msg.context && (msg.context.type == ActionType.AppInit || msg.context.type == ActionType.ApiLoginUserSuccess)) {
            this.currentUserID = msg.resp.user.id; 
        }
    }

    private handleApiGetAccountTokenSuccess(msg: ApiGetAccountTokenSuccessMsg, action: Action) {
        this.authCookie.setAccountToken(msg.resp.token);
    }

    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
            case ActionType.ApiGetAccountTokenSuccess:
                this.handleApiGetAccountTokenSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetUserSuccess:
                this.handleApiGetUserSuccessMsg(payload, action);
                this.emitChange();
                break;

            case ActionType.AppNavbarLogout:
                this.handleAppNavbarLogout(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiLoginUserSuccess:
                this.handleApiLoginUserSuccessMsg(payload, action);
                this.emitChange();
                break;
        }
    }
}