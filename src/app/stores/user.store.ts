import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';
import { User } from '../data';
import { ApiGetUserSuccessMsg } from '../services/api.service';

@Injectable()
export class UserStore extends FluxStore {
    private users: UserMap = {}

    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher)
    }

    public getUser(id): User {
        return this.users[id]
    }

    public getUsers(): UserMap {
        return this.users;
    }

    private handleGetUserSuccessMsg(msg: ApiGetUserSuccessMsg, action: Action) {
        let user = msg.resp.user;
        this.users[user.id] = user;
    }

    protected handleAction(action: Action) {
        let msg = action.payload;
        switch (action.type) {
            case ActionType.ApiGetUserSuccess:
                this.handleGetUserSuccessMsg(msg, action);
                this.emitChange();
                break;
        }
    }
}

interface UserMap {
    [id:number]: User
}