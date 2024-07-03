import { Task } from "../models/definitions";
import { mockTasks } from "./mock-database/mock-data";

/**
 * Todo: connect to real database when ready!
 * - limit can use in the database query
 * - check try catch and set the response status properly
 */
export async function fetchTasksFromUserId(id: string, limit?: number): Promise<{
    status: number,
    tasks: Task[] | [],
}> {
    let result = mockTasks.filter((task: Task) => task.ownerId === id)
    if (limit) {
        result = result.slice(0, result.length - Number(limit) - 1)
    }
    return {
        status: 200,
        tasks: result,
    }
}

export async function fetchTaskFromTaskId(id: string, taskId: string): Promise<{
    status: number,
    tasks: Task[] | [],
}> {
    let result = mockTasks.filter((task: Task) => task.id === id && task.ownerId === id)
    return {
        status: 200,
        tasks: result,
    }
}