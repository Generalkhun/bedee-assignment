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

// Task update
export interface BlockedTaskDetail {
    completionStatus: 'blocked'
    blockedByTaskId: string[]
}

export interface CompletedTaskDetail {
    completionStatus: 'completed'
}

export interface OtherTaskDetail {
    completionStatus: "inprogress" | "backlog"
}

export function isBlockedTaskDetail(updatingDetails: UpdatingTaskDetails): updatingDetails is BlockedTaskDetail {
    return (<BlockedTaskDetail>updatingDetails).completionStatus === 'blocked';
}

export function isCompletedTaskDetail(updatingDetails: UpdatingTaskDetails): updatingDetails is BlockedTaskDetail {
    return (<CompletedTaskDetail>updatingDetails).completionStatus === 'completed';
}

export type UpdatingTaskDetails = BlockedTaskDetail | OtherTaskDetail | CompletedTaskDetail

// api response
export interface APIResponse<B> {
    status: number,
    body: B,
    message?: string,
}


// Error messages
export enum ErrorMessages {
    ALREADY_CREATED = "The task is already created! considered change the title.",
    NOT_CREATED_TASK_YET = "No task stored, please add a task before adding a subtask",
    ALREADY_BELONG = "The subtask is already added to the task",
    USER_NOT_MATCHED = "The attempt to update data is not permitted, please use the right user to perform this action"
}