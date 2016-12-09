import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { FluxStore } from '../flux/store';

@Injectable()
export class AuthStore extends FluxStore {
    constructor(protected dispatcher: Dispatcher) {
        super(dispatcher);
    }
    protected handleAction(action: Action) {
        let payload = action.payload;
        switch (action.type) {
        }
    }
}