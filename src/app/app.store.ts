import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Action } from './flux/dispatcher';
import { ActionType } from './flux/action-type';
import { FluxStore } from './flux/store';
import { AppInitMsg } from './app.actions';
import { AppNavbarLogoutMsg, AppNavbarSwitchProjectMsg } from './app-navbar/app-navbar.actions';
import { UserStore } from './stores/user.store';
import { AccountStore } from './stores/account.store';
import { AuthStore } from './stores/auth.store';
import { toArray } from './utils/toArray';
import { inArray } from './utils/inArray';
import { 
    ApiService, 
    ApiCreateTaskSuccessMsg,
    ApiGetUserSuccessMsg,
    ApiGetProjectsSuccessMsg,
    ApiGetTasksSuccessMsg,
    ApiGetAccountsSuccessMsg,
    ApiGetAccountTokenSuccessMsg,
    ApiCreateAccountSuccessMsg,
    ApiLoginUserSuccessMsg,
    GetTasksReq } from './services/api.service';

@Injectable()
export class AppStore extends FluxStore {
    private currentTaskIds: number[] = [];
    private currentProjectId: number;
    private currentAccountId: number;

    public getCurrentProjectId() {
        return this.currentProjectId;
    }

    public getCurrentTaskIds() {
        return this.currentTaskIds;
    }
    
    constructor(protected dispatcher: Dispatcher, 
        private api: ApiService, 
        private userStore: UserStore,
        private authStore: AuthStore,
        private accountStore: AccountStore,
        private router: Router) {
        super(dispatcher);
    }

    private handleAppInitMsg(msg: AppInitMsg, action: Action) {
        if (!this.authStore.hasUserToken()) return;
        this.api.getUser({}, action);
    }

    private handleGetUserSuccessMsg(msg: ApiGetUserSuccessMsg, action: Action) {
        if (msg.context &&  !inArray(action.type, [ActionType.AppInit, ActionType.ApiLoginUserSuccess])) return;
        this.api.getAccounts({}, msg.context);
    }

    private handleGetProjectsSuccessMsg(msg: ApiGetProjectsSuccessMsg, action: Action) {
        if (msg.context && !inArray(action.type, [ActionType.AppInit, ActionType.ApiLoginUserSuccess, ActionType.ApiLoginUserSuccess])) {
            return
        };
        let user = this.userStore.getUser(this.authStore.getCurrentUserId());
        let projects = toArray(msg.resp.projects);
        let lastProjectId;
        if (projects.length) {
            lastProjectId = projects[Math.max(0, projects.length - 1)].id;
        }
        this.currentProjectId = user.latest_project_id || lastProjectId || null;
        if (this.currentProjectId) {
            let req: GetTasksReq = {project_id: this.currentProjectId}
            this.api.getTasks(req, msg.context);
        }
    }

    private handleAppNavbarSwitchProject(msg: AppNavbarSwitchProjectMsg, action: Action) {
        this.currentProjectId = msg.projectId;
        let req: GetTasksReq = {project_id: this.currentProjectId}
        this.api.getTasks(req, action)
        this.api.updateLatestProject(req, action);
        this.router.navigate(['/project/latest'])
    }

    private handleGetTasksSuccessMsg(msg: ApiGetTasksSuccessMsg, action: Action) {
        if (msg.context && !inArray(action.type, [ActionType.AppInit, ActionType.ApiLoginUserSuccess, ActionType.ApiLoginUserSuccess])) return;
        let taskIds = [];
        for (let id in msg.resp.tasks) {
            taskIds.push(msg.resp.tasks[id].id);
        }
        this.currentTaskIds = taskIds;
    }
    
    private handleCreateTaskSuccess(msg: ApiCreateTaskSuccessMsg, action: Action) {
        let task = msg.resp.task;
        this.currentTaskIds.push(task.id);
    }

    private handleApiGetAccountsSuccess(msg: ApiGetAccountsSuccessMsg, action: Action) {
        let user = this.userStore.getUser(this.authStore.getCurrentUserId());
        let accounts = toArray(msg.resp.accounts);
        // TODO(andrews): Handle no accounts
        if (accounts.length === 0) return;
        if (user.latest_account_id) {
            this.currentAccountId = user.latest_account_id;
        } else {
            this.currentAccountId = accounts[Math.max(accounts.length - 1, 0)].id;
        }
        this.api.getAccountToken({account_id: this.currentAccountId}, msg.context);
    }

    private handleApiGetAccountTokenSuccess(msg: ApiGetAccountTokenSuccessMsg, action: Action) {
        this.api.getProjects({}, msg.context);
    }

    private handleApiCreateAccountSuccess(msg: ApiCreateAccountSuccessMsg, action: Action) {
        this.api.getAccountToken({account_id: msg.resp.account.id}, msg.context);
    }

    protected handleAction(action: Action) {
        let payload: any = action.payload;
        switch (action.type) {
            case ActionType.ApiCreateAccountSuccess:
                this.handleApiCreateAccountSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetAccountTokenSuccess:
                this.handleApiGetAccountTokenSuccess(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetAccountsSuccess:
                this.handleApiGetAccountsSuccess(payload, action);
                this.emitChange();
                break;
            case ActionType.ApiCreateTaskSuccess:
                this.handleCreateTaskSuccess(payload, action);
                this.emitChange();
                break;
            case ActionType.AppNavbarSwitchProject:
                this.handleAppNavbarSwitchProject(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetTasksSuccess:
                this.handleGetTasksSuccessMsg(payload, action);
                this.emitChange();
                break;

            case ActionType.ApiGetProjectsSuccess:
                this.handleGetProjectsSuccessMsg(payload, action);
                this.emitChange();
                break;
                
            case ActionType.ApiGetUserSuccess:
                this.handleGetUserSuccessMsg(payload, action)
                this.emitChange();
                break;

            case ActionType.AppInit:
                this.handleAppInitMsg(payload, action);
                this.emitChange();
                break;
        }
    }
}