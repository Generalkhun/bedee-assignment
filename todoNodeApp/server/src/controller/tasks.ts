import { Request, Response } from "express";
import { TasksRequest } from "../models/dataTransferObject/Task";
import { Task } from "../models/definitions";
import { fetchTaskFromTaskId, fetchTasksFromUserId } from "../services/fetchTasks";
import { addTasktoDB, addSubTasktoDB } from "../services/addTask";


export async function getTasks(request: Request<{}, { status: number, message: { tasks: Task[] | [] } }, TasksRequest.GetTasks>, response: Response) {
    const { userId, limit } = request.body
    const res = await fetchTasksFromUserId(userId, Number(limit))
    return response.json(res)
}

export async function getTasksById(request: Request<{ taskId: string }, {}, TasksRequest.GetTaskById>, response: Response) {
    const { userId } = request.body
    const { taskId } = request.params;
    const res = await fetchTaskFromTaskId(userId, taskId)
    return response.json(res)
}

export async function addTask(request: Request<{}, {}, TasksRequest.AddTask>, response: Response) {
    const {
        userId,
        taskTitle,
        taskDescription
    } = request.body
    const res = await addTasktoDB({ userId, taskTitle, taskDescription })
    response.json(res)
}

export async function addSubTask(request: Request<{}, {}, TasksRequest.AddTask>, response: Response) {
    const {
        userId,
        taskId,
        subTaskId,
    } = request.body
    const res = await addSubTasktoDB({ userId, taskId, subTaskId })
    response.json(res)
}

export function updateTask(request: Request<{}, {}, TasksRequest.UpdateTask>, response: Response) {
    //response.json(res)
}
export function deleteTask(request: Request<{}, {}, TasksRequest.DeleteTask>, response: Response) {
    //response.json(res)
}