import { Injectable, EventEmitter } from '@angular/core';
import { Dispatcher, Action } from './dispatcher';

@Injectable()
export abstract class FluxStore {
    public change = new EventEmitter();
    public dispatchToken: string;

    constructor(protected dispatcher: Dispatcher) {
        this.dispatchToken = this.dispatcher.register(this.handleAction.bind(this));
    }

    protected emitChange() {
        this.change.emit();
    }

    protected abstract handleAction(action: Action)
}