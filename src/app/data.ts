export interface Account {
    id: number;
    name: string;
}

export interface AccountMap {
    [id:number]: Account;    
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
    account_id: number;
    latest_project_id: number;
    latest_account_id: number;
}

export interface Invitation {
    email: string
}

export interface Project {
    id: number;
    name: string;
    account_id: number;
}

export interface ProjectMap {
    [id:number]: Project
}

export interface Task {
    id: number;
    title: string;
    description: string;
    project_id: number;
    completed: boolean;
    created_at: number;
    updated_at: number;
    assignee_id: number;
    creator_id: number;
    priority: TaskPriority;
}

export interface TaskMap {
    [id:number]: Task
}

export enum TaskPriority {
    Low,
    Medium,
    High
}

export interface UFile {
    id: number;
    name: string;
    url: string;
    size: number;
}

export interface Comment {
    id: number;
    body: string;
    author_id: number;
    task_id: number;
    created_at: number;
    updated_at: number;
}

export interface CommentMap {
    [id:number]: Comment
}