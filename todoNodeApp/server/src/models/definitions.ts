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
