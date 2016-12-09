import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { AppNavbarLogoutMsg } from './app-navbar.actions';
import { AuthStore } from '../stores/auth.store';

@Injectable()
export class AppNavbarStore extends FluxStore {
    constructor(protected dispatcher: Dispatcher, private authStore: AuthStore, private router: Router) {
        super(dispatcher);
    }

    private handleAppNavbarLogoutMsg(msg: AppNavbarLogoutMsg, context: Action) {
        this.dispatcher.waitFor([this.authStore.dispatchToken]);
        this.router.navigate(['/login']);
    }

    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.AppNavbarLogout:
                this.handleAppNavbarLogoutMsg(payload, action)
                this.emitChange();
                break;
        }
    }
}

