import { Task, ErrorMessages, APIResponse } from "../models/definitions";
import { fetchTasksFromUserId } from "./fetchTasks";
import { mockTasks } from "./mock-database/mock-data";

export async function addTasktoDB({
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

export async function addSubTasktoDB({
    userId,
    taskId,
    subTaskId,
}: {
    userId: string,
    taskId: string,
    subTaskId: string,
}): Promise<APIResponse<{ addedSubTaskId: string | null }>> {

    // check if already add this sub task id
    //Find if the user already got this task in the db
    let userTasks: Task[] | [] = []
    try {
        const { body } = await fetchTasksFromUserId(userId)
        const tasks = body.tasks
        userTasks = tasks
    } catch (error: unknown) {
        /** handle errors */
    }
    //if the user havent create any task yet, shoul now allow to add
    if (!userTasks.length) {
        return {
            status: 400,
            body: {
                addedSubTaskId: null
            },
            message: ErrorMessages.NOT_CREATED_TASK_YET
        }
    }

    const alreadyBelong = userTasks.filter((task: Task) => task.id === subTaskId)
    if (alreadyBelong.length) {
        return {
            status: 400,
            body: {
                addedSubTaskId: null
            },
            message: ErrorMessages.ALREADY_BELONG
        }
    }

    // add sub task to the correct task 
    /**Todo implement in read db */
    mockTasks.forEach((task) => {
        if (task.id === taskId) {
            task.subtasksId = [...task.subtasksId, subTaskId]
        }
    })

    return {
        status: 200,
        body: {
            addedSubTaskId: subTaskId
        }
    }
}