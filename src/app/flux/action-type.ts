export enum ActionType {
    // App
    AppInit,

    // API
    ApiUploadToS3Success,
    ApiUploadToS3Error,

    ApiCreatePresignedPostSuccess,
    ApiCreatePresignedPostError,

    ApiGetAccountsSuccess,
    ApiGetAccountsError,

    ApiGetAccountTokenSuccess,
    ApiGetAccountTokenError,

    ApiDeleteTaskSuccess,
    ApiDeleteTaskError,

    ApiUpdateTaskSuccess,
    ApiUpdateTaskError,

    ApiUncompleteTaskSuccess,
    ApiUncompleteTaskError,

    ApiCreateCommentSuccess,
    ApiCreateCommentError,

    ApiListCommentsSuccess,
    ApiListCommentsError,

    ApiCreateUserSuccess,
    ApiCreateUserError,

    ApiGetUserSuccess,
    ApiGetUserError,

    ApiCreateAccountSuccess,
    ApiCreateAccountError,

    ApiCreateTaskSuccess,
    ApiCreateTaskError, 

    ApiCompleteTaskSuccess,
    ApiCompleteTaskError,

    ApiUpdateLatestProjectSuccess,
    ApiUpdateLatestProjectError, 

    ApiLoginUserSuccess,
    ApiLoginUserError,

    ApiGetTaskSuccess,
    ApiGetTaskError,

    ApiGetTasksSuccess,
    ApiGetTasksError,

    ApiGetProjectsSuccess,
    ApiGetProjectsError,

    // Login   
    LoginSubmit,

    // Signup   
    SignupSubmit,

    // AppNavbar
    AppNavbarLogout,
    AppNavbarSwitchProject,

    // ProjecMaster
    ProjectMasterSearch,

    // Project detail
    ProjectDetailInit,

    // ProjectMasterItem
    ProjectMasterItemDragStart,
    ProjectMasterItemDragEnter,
    ProjectMasterItemDragEnd,

    // TaskMasterItem
    TaskMasterItemComplete,
    TaskMasterItemUncomplete,

    // TaskDetail
    TaskDetailTaskIdChanged,
    TaskDetailUpdateTask,
    TaskDetailDeleteTask,
    TaskDetailPresign,

    // Companies
    CompaniesSubmitCompanyForm,
    CompaniesSubmitInviteForm,
    CompaniesGoToProjects,

    // NewTask
    NewTaskSubmit,
    NewTaskChangeTitle,

    // CommentForm
    CommentFormSubmit,
    CommentFormUpdateBody,

    // Setup
    SetupSubmit,

}