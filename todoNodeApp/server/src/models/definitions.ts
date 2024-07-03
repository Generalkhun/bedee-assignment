// Contains type of out todo app's data
export type TaskCompletionStatus = 'completed' | 'inprogress' | 'backlog' | 'blocked'
export interface Task {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    subtasksId: string[] | [];
    completionStatus: TaskCompletionStatus;
    createdAt: string;
    blockedByTasksId?: string[];
    completedAt?: string;
}

export interface User {
    id: string;
    name: string;
}

export interface UpdatingTaskDetails {
    /**for futher updating detail, add here */
    completionStatus?: TaskCompletionStatus
    blockedByTaskId?: string[]
}

export interface APIResponse<B> {
    status: number,
    body: B,
    message?: string,
}


// Error messages
export enum ErrorMessages {
    ALREADY_CREATED = "The task is already created! considered change the title.",
    NOT_CREATED_TASK_YET = "No task stored, please add a task before adding a subtask",
    ALREADY_BELONG = "The subtask is already added to the task"
}