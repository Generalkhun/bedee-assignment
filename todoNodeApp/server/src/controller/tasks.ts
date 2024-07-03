import { Request, Response } from "express";
import { TasksRequest } from "../models/dataTransferObject/Task";
import { Task } from "../models/definitions";
import { fetchTaskFromTaskId, fetchTasksFromUserId } from "../services/fetchTasks";
import { addTasktoDB, addSubTasktoDB } from "../services/addTask";
import { updateTaskDB } from "../services/updateTask";
import { deleteTaskDB } from "../services/deleteTaskDB";


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
    const res = await addTasktoDB(request.body)
    response.json(res)
}

export async function addSubTask(request: Request<{}, {}, TasksRequest.AddSubTask>, response: Response) {
    const res = await addSubTasktoDB(request.body)
    response.json(res)
}

export async function updateTask(request: Request<{}, {}, TasksRequest.UpdateTask>, response: Response) {
    const res = await updateTaskDB(request.body)
    response.json(res)
}
export async function deleteTask(request: Request<{}, {}, TasksRequest.DeleteTask>, response: Response) {
    const res = await deleteTaskDB(request.body)
    response.json(res)
}