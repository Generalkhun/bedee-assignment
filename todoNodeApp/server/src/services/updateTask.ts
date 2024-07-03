import { APIResponse, ErrorMessages, Task, UpdatingTaskDetails, isBlockedTaskDetail, isCompletedTaskDetail } from "../models/definitions"
import { mockTasks } from "./mock-database/mock-data"


export async function updateTaskDB({
    userId,
    taskId,
    updatingDetails
}: {
    userId: string,
    taskId: string,
    updatingDetails: UpdatingTaskDetails,
}): Promise<APIResponse<{ updatedTask: Task | null }>> {
    /**@Todo implement database function */

    // check if the task existed on the specified user
    const userTasks = mockTasks.filter(task => task.ownerId === userId)
    if (!userTasks.length) {
        return {
            status: 400,
            message: ErrorMessages.USER_NOT_MATCHED,
            body: {
                updatedTask: null
            }
        }
    }
    //update tasks completion status
    mockTasks.forEach(task => {
        if (task.id === taskId) {
            task.completionStatus = updatingDetails.completionStatus
        }
    })

    let updatedTask = null

    // update completed task
    if (isCompletedTaskDetail(updatingDetails)) {
        updatedTask = await completeTask(taskId);
    }

    // update blocker

    if (isBlockedTaskDetail(updatingDetails)) {
        updatedTask = await setBlockedByTasks({
            taskId,
            blockedByTaskId: updatingDetails.blockedByTaskId
        })
    }

    /**@todo refine this logic, find the better solution when cannot find the task */
    if (!updatedTask) {
        return {
            body: {
                updatedTask
            },
            status: 400,
            message: 'some thing went wrong'
        }
    }
    return {
        body: {
            updatedTask
        },
        status: 200,
    }

}

async function completeTask(taskId: string): Promise<Task | null> {
    mockTasks.forEach(task => {
        if (task.id === taskId) {
            task.completedAt = new Date().toISOString()
            return task
        }
    })
    return null
}

async function setBlockedByTasks({
    taskId,
    blockedByTaskId
}: {
    taskId: string,
    blockedByTaskId: string[],
}): Promise<Task | null> {
    mockTasks.forEach(task => {
        if (task.id === taskId) {
            task.blockedByTasksId = !task.blockedByTasksId ? [...blockedByTaskId] : [...task.blockedByTasksId, ...blockedByTaskId]
            return task
        }
    })
    return null
}