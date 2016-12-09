import { Injectable } from '@angular/core';
import { Dispatcher } from './flux/dispatcher';
import { ActionType } from './flux/action-type';

@Injectable()
export class AppActions {
    constructor(private dispatcher: Dispatcher) {}

    init() {
        let payload: AppInitMsg = {}
        this.dispatcher.dispatch({
            type: ActionType.AppInit,
            payload
        })
    }
}

export interface AppInitMsg {}
