import { mockTasks } from "./mock-database/mock-data"

export async function deleteTaskDB({
    taskId,
}: {
    userId: string,
    taskId: string,
}) {
    // this is not a working implementation. due to mocking the data, we cannot mutate the mock data
    /**@todo implement on real db */
    mockTasks.filter(task => task.id !== taskId)
    return {
        status:200,
        body: {
            deletedTaskId: taskId
        }
    }
}