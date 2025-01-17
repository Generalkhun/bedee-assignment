import { UpdatingTaskDetails } from "../definitions";


namespace TasksRequest {
    export interface AddTask {
        userId: string;
        taskTitle: string;
        taskDescription: string;
    }
    export interface AddSubTask {
        userId: string;
        taskId: string;
        subTaskId: string;
    }
    export interface UpdateTask {
        userId: string;
        taskId: string;
        updatingDetails: UpdatingTaskDetails;
    }
    export interface DeleteTask {
        userId: string; // need this to validate. The user must not delete others' tasks
        taskId: string; 
    }
}