import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { XHttp } from '../utils/xhttp';
import { Dispatcher, Action } from '../flux/dispatcher';
import { ActionType } from '../flux/action-type';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { User, 
  Account, 
  Task, 
  TaskMap, 
  Project, 
  ProjectMap,
  Comment, 
  CommentMap } from '../data'

@Injectable()
export class ApiService {
  private api: string = 'http://localhost:8080'
  
  constructor(private http: XHttp, private dispatcher: Dispatcher) { }

  // Authentication
  loginUser(req: LoginUserReq, context?: Action): Observable<LoginUserResp> {
    let r = this.http.post(`${this.api}/authenticate`, req).share()
    r.subscribe(
      res => {
        let payload: ApiLoginUserSuccessMsg = {context, token: res.json().token}
        this.dispatcher.dispatch({
          type: ActionType.ApiLoginUserSuccess,
          payload
        })
      },
      err => {
        let payload: ApiLoginUserErrorMsg = {context}
        this.dispatcher.dispatch({
          type: ActionType.ApiLoginUserError,
          payload
        })
      }
    )
    return r.map(resp => resp.json());
  }

  // Users
  createUser(req: CreateUserReq, context?: Action): Observable<CreateUserResp> {
    let r = this.http.post(`${this.api}/users`, req).share();
    r.subscribe(
      res => {
        let resp: CreateUserResp = res.json()
        let payload: ApiCreateUserSuccessMsg = {context, resp}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateUserSuccess,
          payload
        })
      },
      err => {
        let payload: ApiCreateUserErrorMsg = {context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateUserError,
          payload
        })
      }
    )
    return r.map(resp => resp.json());
  }

  getUser(req: GetUserReq, context?: Action): Observable<GetUserResp> {
    let r = this.http.get(`${this.api}/user`, {body: req}).share()
    r.subscribe(
      res => {
        let resp: GetUserResp = res.json()
        let payload: ApiGetUserSuccessMsg = {context, resp}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetUserSuccess,
          payload
        })
      },
      err => {
        let payload: ApiGetUserErrorMsg = {context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetUserError,
          payload
        })
      }
    )
    return r.map(resp => resp.json());
  }

  // Projects
  getProjects(req: GetProjectsReq, context?: Action): Observable<GetProjectsResp> {
    let r = this.http.get(`${this.api}/api/projects`, {body: req}).share();
    r.subscribe(
      res => {
        let resp: GetProjectsResp = res.json();
        let payload: ApiGetProjectsSuccessMsg = {context, resp}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetProjectsSuccess,
          payload
        })
      },
      err => {
        let payload: ApiGetProjectsErrMsg = {context, err}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetProjectsError,
          payload
        })
      }
    );
    return r.map(resp => resp.json());
  }

  // Account
  createAccount(req: CreateAccountReq, context?: Action): Observable<CreateAccountResp> {
    let r = this.http.post(`${this.api}/api/accounts`, req).map(r => r.json())
    r.subscribe(
      resp => {
        let payload: ApiCreateAccountSuccessMsg = {context, resp}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateAccountSuccess,
          payload
        })
      },
      err => {
        let payload: ApiCreateAccountErrorMsg = {context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateAccountSuccess,
          payload
        })
      }
    )
    return r
  }

  // Tasks
  createTask(req: CreateTaskReq, context?: Action): Observable<CreateTaskResp> {
    let r = this.http.post(`${this.api}/api/tasks`, req).map(res => res.json()).share();

    r.subscribe(
      resp => {
        let payload: ApiCreateTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateTaskSuccess,
          payload
        })
      },
      err => {
        let payload: ApiCreateTaskErrMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateTaskError,
          payload
        })
      }
    )
    return r
  }

  getTask(req: GetTaskReq, context: Action): Observable<GetTaskResp> {
    let r = this.http.post(`${this.api}/api/task/get`, req).map(resp => resp.json())
    r.subscribe(
      resp => {
        let payload: ApiGetTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetTaskSuccess,
          payload
        })
      },
      err => {
      let payload: ApiGetTaskErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetTaskError,
          payload
        })
      }
    )
    return r
  }

  getTasks(req: GetTasksReq, context: Action): Observable<GetTasksResp> {
    let r = this.http.post(`${this.api}/api/tasks/list`, req).map(resp => resp.json())
    r.subscribe(
      resp => {
        let payload: ApiGetTasksSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetTasksSuccess,
          payload
        })
      },
      err => {
      let payload: ApiGetTasksErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetTasksError,
          payload
        })
      }
    )
    return r
  }

  completeTask(req: CompleteTaskReq, context: Action): Observable<CompleteTaskResp> {
    let r = this.http.post(`${this.api}/api/tasks/complete`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiCompleteTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCompleteTaskSuccess,
          payload
        })
      },
      err => {
      let payload: ApiCompleteTaskErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCompleteTaskError,
          payload
        })
      }
    )
    return r;
  }

  uncompleteTask(req: UncompleteTaskReq, context: Action): Observable<UncompleteTaskResp> {
    let r = this.http.post(`${this.api}/api/tasks/uncomplete`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiUncompleteTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUncompleteTaskSuccess,
          payload
        })
      },
      err => {
      let payload: ApiUncompleteTaskErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUncompleteTaskError,
          payload
        })
      }
    )
    return r;
  }

  updateLatestProject(req: UpdateLatestProjectReq, context: Action): Observable<UpdateLatestProjectResp> {
    let r = this.http.post(`${this.api}/api/user/latest_project`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiUpdateLatestProjectSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUpdateLatestProjectSuccess,
          payload
        })
      },
      err => {
      let payload: ApiUpdateLatestProjectErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUpdateLatestProjectError,
          payload
        })
      }
    )
    return r;
  }

  createComment(req: CreateCommentReq, context: Action): Observable<CreateCommentResp> {
    let r = this.http.post(`${this.api}/api/comments`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiCreateCommentSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateCommentSuccess,
          payload
        })
      },
      err => {
      let payload: ApiCreateCommentErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreateCommentError,
          payload
        })
      }
    )
    return r;
  }

  listComments(req: ListCommentsReq, context: Action): Observable<ListCommentsResp> {
    let r = this.http.post(`${this.api}/api/comments/list`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiListCommentsSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiListCommentsSuccess,
          payload
        })
      },
      err => {
      let payload: ApiListCommentsErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiListCommentsError,
          payload
        })
      }
    )
    return r;
  }

  updateTask(req: UpdateTaskReq, context: Action): Observable<UpdateTaskResp> {
    let r = this.http.post(`${this.api}/api/task/update`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiUpdateTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUpdateTaskSuccess,
          payload
        })
      },
      err => {
      let payload: ApiUpdateTaskErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUpdateTaskError,
          payload
        })
      }
    )
    return r;
  }

  deleteTask(req: DeleteTaskReq, context: Action): Observable<DeleteTaskResp> {
    let r = this.http.post(`${this.api}/api/task/delete`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiDeleteTaskSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiDeleteTaskSuccess,
          payload
        })
      },
      err => {
      let payload: ApiDeleteTaskErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiDeleteTaskError,
          payload
        })
      }
    )
    return r;
  }

  getAccountToken(req: GetAccountTokenReq, context: Action): Observable<GetAccountTokenResp> {
    let r = this.http.post(`${this.api}/api/account/token`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiGetAccountTokenSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetAccountTokenSuccess,
          payload
        })
      },
      err => {
      let payload: ApiGetAccountTokenErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetAccountTokenError,
          payload
        })
      }
    )
    return r;
  }

  getAccounts(req: GetAccountsReq, context: Action): Observable<GetAccountsResp> {
    let r = this.http.post(`${this.api}/api/accounts/list`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiGetAccountsSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetAccountsSuccess,
          payload
        })
      },
      err => {
      let payload: ApiGetAccountsErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiGetAccountsError,
          payload
        })
      }
    )
    return r;
  }

  createPresignedPost(req: CreatePresignedPostReq, context: Action): Observable<CreatePresignedPostResp> {
    let r = this.http.post(`${this.api}/api/presign`, req).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiCreatePresignedPostSuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreatePresignedPostSuccess,
          payload
        })
      },
      err => {
      let payload: ApiCreatePresignedPostErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiCreatePresignedPostError,
          payload
        })
      }
    )
    return r;
  }

  uploadToS3(req: UploadToS3Req, context: Action): Observable<UploadToS3Resp> {
    // let data = new FormData();
    // data.append('file', req.file);
    // let headers = new Headers({
    //   'Content-Type': 'multipart/form-data'
    // });
    let r = this.http.post(req.presigned_url, req.file).map(resp => resp.json()).share()
    r.subscribe(
      resp => {
        let payload: ApiUploadToS3SuccessMsg = {resp, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUploadToS3Success,
          payload
        })
      },
      err => {
      let payload: ApiUploadToS3ErrorMsg = {err, context}
        this.dispatcher.dispatch({
          type: ActionType.ApiUploadToS3Error,
          payload
        })
      }
    )
    return r;
  }

}

export interface UploadToS3Req {
  file: File;
  presigned_url: string;
}
export interface UploadToS3Resp {
  // url: string;
}
export interface ApiUploadToS3SuccessMsg {
  resp: UploadToS3Resp;
  context: Action;
}
export interface ApiUploadToS3ErrorMsg {
  err: Error;
  context: Action;
}

export interface CreatePresignedPostReq {
  content_length: number;
}
export interface CreatePresignedPostResp {
  url: string;
}
export interface ApiCreatePresignedPostSuccessMsg {
  resp: CreatePresignedPostResp;
  context: Action;
}
export interface ApiCreatePresignedPostErrorMsg {
  err: Error;
  context: Action;
}

export interface GetAccountsReq {
}
export interface GetAccountsResp {
  accounts: Account[];
}
export interface ApiGetAccountsSuccessMsg {
  resp: GetAccountsResp;
  context: Action;
}
export interface ApiGetAccountsErrorMsg {
  err: Error;
  context: Action;
}

export interface GetAccountTokenReq {
  account_id: number;
}
export interface GetAccountTokenResp {
  token: string;
}
export interface ApiGetAccountTokenSuccessMsg {
  resp: GetAccountTokenResp;
  context: Action;
}
export interface ApiGetAccountTokenErrorMsg {
  err: Error;
  context: Action;
}

export interface DeleteTaskReq {
  id: number;
}
export interface DeleteTaskResp {
  id: number;
}
export interface ApiDeleteTaskSuccessMsg {
  resp: DeleteTaskResp;
  context: Action;
}
export interface ApiDeleteTaskErrorMsg {
  err: Error;
  context: Action;
}

export interface UpdateTaskReq {
  id: number;
  title: string;
  description: string;
}
export interface UpdateTaskResp {
  task: Task;
}
export interface ApiUpdateTaskSuccessMsg {
  resp: UpdateTaskResp;
  context: Action;
}
export interface ApiUpdateTaskErrorMsg {
  err: Error;
  context: Action;
}

// API Action Msgs
export interface ListCommentsReq {
  task_id: number;
}
export interface ListCommentsResp {
  comments: CommentMap;
}
export interface ApiListCommentsSuccessMsg {
  resp: ListCommentsResp;
  context: Action;
}
export interface ApiListCommentsErrorMsg {
  err: Action;
  context: Action;
}

export interface CreateCommentReq {
  body: string;
  task_id: number;
}

export interface CreateCommentResp {
  comment: Comment;
}

export interface ApiCreateCommentSuccessMsg {
  resp: CreateCommentResp;
  context: Action;
}
export interface ApiCreateCommentErrorMsg {
  err: Error;
  context: Action;
}

export interface UpdateLatestProjectReq {
  project_id: number;
}

export interface UpdateLatestProjectResp {
  user: User; 
}

export interface ApiUpdateLatestProjectSuccessMsg {
  resp: UpdateLatestProjectResp;
  context: Action;
} 

export interface ApiUpdateLatestProjectErrorMsg {
  err: Error;
  context: Action;
}

export interface UncompleteTaskReq {
  id: number;
}

export interface UncompleteTaskResp {
  task: Task;
}

export interface ApiUncompleteTaskSuccessMsg {
  resp: UncompleteTaskResp;
  context: Action
}

export interface ApiUncompleteTaskErrorMsg{
  err: Error;
  context: Action;
}

// Users
// Create users
export interface ApiCreateUserSuccessMsg {
  resp: CreateUserResp
  context: Action
}
export interface ApiCreateUserErrorMsg {
  context: Action
}

// Get users
export interface ApiGetUserSuccessMsg {
  resp: GetUserResp
  context: Action
}
export interface ApiGetUserErrorMsg {
  context: Action
}

// Login
export interface ApiLoginUserSuccessMsg {
  token: string
  context: Action
}
export interface ApiLoginUserErrorMsg {
  context: Action
}

// Create account
export interface ApiCreateAccountSuccessMsg {
  resp: CreateAccountResp
  context: Action
}
export interface ApiCreateAccountErrorMsg {
  context: Action
}

// tasks
// Get Task
export interface ApiGetTaskSuccessMsg {
  resp: GetTaskResp
  context: Action
}

export interface ApiGetTaskErrorMsg {
  err: GetTaskErrResp,
  context: Action
}

export interface ApiCompleteTaskSuccessMsg {
  resp: CompleteTaskResp
  context: Action
}

export interface ApiCompleteTaskErrorMsg {
  err: CompleteTaskErrResp,
  context: Action
}

export interface ApiGetTasksSuccessMsg {
  resp: GetTasksResp
  context: Action
}

export interface ApiGetTasksErrorMsg {
  err: GetTasksErrResp,
  context: Action
}

export interface ApiCreateTaskSuccessMsg {
  resp: CreateTaskResp;
  context: Action
}

export interface ApiCreateTaskErrMsg {
  err: Error;
  context: Action;
}

// Projects
export interface ApiGetProjectsSuccessMsg {
  resp: GetProjectsResp,
  context: Action
}

export interface ApiGetProjectsErrMsg {
  err: Error,
  context: Action
}

// Request interfaces

// Users
export interface CreateUserReq {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

export interface CreateUserResp {
  user: User;
}

export interface GetUserReq {
  id?: number;
}

export interface GetUserResp {
  user: User;
}

// Accounts
export interface CreateAccountReq {
  name: string
}

export interface CreateAccountResp {
  account: Account
}

// tasks
export interface GetTaskReq {
  id: number
}

export interface GetTaskResp {
  task: Task
}

export interface CompleteTaskReq {
  id: number
}

export interface CompleteTaskResp {
  task: Task
}

export interface CompleteTaskErrResp {
}

export interface GetTasksErrResp {
}

export interface GetTasksReq {
  project_id: number;
}

export interface GetTasksResp {
  tasks: TaskMap;
}

export interface GetTaskErrResp {
}

export interface CreateTaskReq {
  title: string;
  project_id: number;
  account_id: number;
}

export interface CreateTaskResp {
  task: Task
}

// Login
export interface LoginUserReq {
  email: string,
  password: string,
}

export interface LoginUserResp {
  token: string
}

// Projects
export interface GetProjectsReq {
}

export interface GetProjectsResp {
  projects: ProjectMap;
}
