import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthCookieService } from './services/auth-cookie.service';

import { ProjectStore } from './stores/project.store';
import { TaskStore } from './stores/task.store';
import { UserStore } from './stores/user.store';
import { AccountStore } from './stores/account.store';

import { ProjectMasterItemActions } from './project-master-item/project-master-item.actions';

import { AppStore } from './app.store';
import { AppActions } from './app.actions';

import { ProjectMasterStore } from './project-master/project-master.store';
import { ProjectMasterActions } from './project-master/project-master.actions';

import { TaskMasterItemActions } from './task-master-item/task-master-item.actions';
import { TaskMasterStore } from './task-master/task-master.store';

import { AppNavbarActions } from './app-navbar/app-navbar.actions';
import { AppNavbarStore } from './app-navbar/app-navbar.store';

import { SignupActions } from './signup/signup.actions';
import { SignupStore } from './signup/signup.store';

import { SetupActions } from './setup/setup.actions';
import { SetupStore } from './setup/setup.store';

import { NewTaskActions } from './new-task/new-task.actions';
import { NewTaskStore } from './new-task/new-task.store';

import { LoginActions } from './login/login.actions';
import { LoginStore } from './login/login.store';

import { CompaniesActions } from './companies/companies.actions';
import { CompaniesStore } from './companies/companies.store';

import { CommentFormActions } from './comment-form/comment-form.actions';
import { CommentFormStore } from './comment-form/comment-form.store';

import { TaskDetailActions } from './task-detail/task-detail.actions';
import { TaskDetailStore } from './task-detail/task-detail.store';

import { AuthStore } from './stores/auth.store';
import { CommentStore } from './stores/comment.store';

import { Dispatcher } from './flux/dispatcher';

// Gaurds
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';

// Services
import { ApiService } from './services/api.service';
import { XHttp } from './utils/xhttp';
import { CookieService } from './utils/cookie.service';

import { AppComponent } from './app.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { HumanFileSizePipe } from './utils/human-file-size.pipe';
import { PriorityPipe } from './utils/priority.pipe';
import { TimeAgoPipe } from './utils/time-ago.pipe';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppNavbarMenuComponent } from './app-navbar-menu/app-navbar-menu.component';
import { ModalComponent } from './shared/modal/modal.component';
import { InviteMemberModalComponent } from './invite-member-modal/invite-member-modal.component';
import { MembersModalComponent } from './members-modal/members-modal.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { DragHandleComponent } from './drag-handle/drag-handle.component';
import { AppMenuBtnComponent } from './app-menu-btn/app-menu-btn.component';
import { ProjectMasterItemComponent } from './project-master-item/project-master-item.component';
import { TaskMasterItemComponent } from './task-master-item/task-master-item.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { TaskDetailSecondaryComponent } from './task-detail-secondary/task-detail-secondary.component';
import { TaskDetailStatusBtnComponent } from './task-detail-status-btn/task-detail-status-btn.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ResizeDirective } from './utils/resize.directive';
import { ClickToWriteDirective } from './utils/click-to-write.directive';
import { CheckmarkDirective } from './utils/checkmark.directive';
import { TooltipDirective } from './utils/tooltip.directive';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SetupComponent } from './setup/setup.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { LegalComponent } from './legal/legal.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { BillingComponent } from './billing/billing.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectMasterComponent,
    TaskMasterComponent,
    TaskDetailComponent,
    HumanFileSizePipe,
    PriorityPipe,
    TimeAgoPipe,
    AppNavbarComponent,
    AppNavbarMenuComponent,
    ModalComponent,
    InviteMemberModalComponent,
    MembersModalComponent,
    UserAvatarComponent,
    DragHandleComponent,
    AppMenuBtnComponent,
    ProjectMasterItemComponent,
    TaskMasterItemComponent,
    AppMenuComponent,
    TaskDetailSecondaryComponent,
    TaskDetailStatusBtnComponent,
    FrontPageComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CompaniesComponent,
    NewProjectComponent,
    ProjectDetailComponent,
    ResizeDirective,
    ClickToWriteDirective,
    CheckmarkDirective,
    UserListComponent,
    UserCardComponent,
    SetupComponent,
    AccountDetailComponent,
    LegalComponent,
    ConfirmComponent,
    NewTaskComponent,
    BillingComponent,
    CommentFormComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: FrontPageComponent},
      {path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard]},
      {path: 'task/:taskId', component: TaskDetailComponent, canActivate: [AuthGuard]},
      {path: 'project/latest', component: ProjectDetailComponent, canActivate: [AuthGuard]},
      {path: 'setup', component: SetupComponent, canActivate: [AuthGuard]},
      {path: 'account', component: AccountDetailComponent, canActivate: [AuthGuard]},
      {path: 'legal', component: LegalComponent},
      {path: 'confirm', component: ConfirmComponent},
      {path: 'billing', component: BillingComponent, canActivate: [AuthGuard]},
      // {path: 'companies', component: CompaniesComponent},
      // {path: 'projects', component: ProjectMasterComponent},
      // {path: 'projects/:projectId/tasks/:taskId', component: TaskDetailComponent},
      // {path: 'home', component: HomeComponent},
      {path: 'signup', component: SignupComponent},
    ])
  ],
  providers: [
    AppActions,
    AppStore,
    AppNavbarActions,
    AppNavbarStore,
    LoginActions,
    LoginStore,
    SignupActions,
    SignupStore,
    SetupActions,
    SetupStore,
    CompaniesActions,
    CompaniesStore,
    TaskDetailActions,
    TaskDetailStore,
    ProjectMasterItemActions,
    ProjectMasterStore,
    ProjectMasterActions,
    NewTaskStore,
    NewTaskActions,
    TaskMasterItemActions,
    TaskMasterStore,
    CommentFormActions,
    CommentFormStore,
    ProjectStore,
    TaskStore,
    UserStore,
    CommentStore,
    AuthStore,
    AccountStore,
    Dispatcher,
    ApiService,
    CookieService,
    AuthGuard,
    ReverseAuthGuard,
    AuthCookieService,
    XHttp
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
