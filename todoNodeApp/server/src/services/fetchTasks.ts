import { APIResponse, Task } from "../models/definitions";
import { mockTasks } from "./mock-database/mock-data";

/**
 * @Todo : connect to real database
 * - limit can use in the database query
 * - check try catch and set the response status properly
 */
type FetchTasksResponse = APIResponse<{ tasks: Task[] | [] }>
export async function fetchTasksFromUserId(id: string, limit?: number): Promise<FetchTasksResponse> {
    let result = mockTasks.filter((task: Task) => task.ownerId === id)
    if (limit) {
        result = result.slice(0, Number(limit))
    }
    return {
        status: 200,
        body: {
            tasks: result,
        }
    }
}

export async function fetchTaskFromTaskId(taskId: string): Promise<FetchTasksResponse> {
    let result = mockTasks.filter((task: Task) => task.id === taskId)
    return {
        status: 200,
        body: {
            tasks: result,
        }
    }
}