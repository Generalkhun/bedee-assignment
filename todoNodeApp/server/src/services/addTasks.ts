import { Task, ErrorMessages, APIResponse } from "../models/definitions";
import { fetchTasksFromUserId } from "./fetchTasks";
import { mockTasks } from "./mock-database/mock-data";

export async function addTask({
    userId,
    taskTitle,
    taskDescription
}: {
    userId: string;
    taskTitle: string;
    taskDescription: string;
}): Promise<APIResponse<{ addedTask: Task | null }>> {

    let userTasks: Task[] | [] = []
    //Find if the user already got this task in the db
    try {
        const { body } = await fetchTasksFromUserId(userId)
        const tasks = body.tasks
        userTasks = tasks
    } catch (error: unknown) {
        /** handle errors */
    }
    if (userTasks.length) {
        const alreadyCreated = userTasks.filter((task: Task) => task.title === taskTitle)
        if (alreadyCreated.length) {
            return {
                status: 500,
                message: ErrorMessages.ALREADY_CREATED,
                body: {
                    addedTask: null
                }
            }
        }
    }

    // mocking database adjustment
    const addedTask = {
        id: (Math.random()).toString(),
        title: taskTitle,
        description: taskDescription,
        ownerId: userId,
        subtasksId: [],
        completionStatus: 'backlog',
        createdAt: new Date().toISOString(),
    } as Task
    mockTasks.push()
    return {
        status: 200,
        body: {
            addedTask: addedTask
        }
    }
}

export async function addSubTask() {

}