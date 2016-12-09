///<reference path="../../../typings/index.d.ts"/>
import { Injectable } from '@angular/core';
import * as flux from 'flux';
import { ActionType } from './action-type';

@Injectable()
export class Dispatcher {
    private d = new flux.Dispatcher()
    constructor() {}

    register(fn): string {
        return this.d.register(fn)
    }

    unregister(fn) {
        this.d.unregister(fn);
    }

    dispatch(action: Action) {
        console.log({type: ActionType[action.type], payload: action.payload})
        this.d.dispatch(action);
    }

    isDispatching(): boolean {
        return this.d.isDispatching();
    }

    waitFor(tokens: string[]) {
        this.d.waitFor(tokens);
    }
}

export interface Action {
    type: ActionType,
    payload: any
}