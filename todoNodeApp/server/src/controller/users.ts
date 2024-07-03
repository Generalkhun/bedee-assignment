
import { Request, Response } from "express";
import { TasksRequest } from "../models/dataTransferObject/Task";
import { Task } from "../models/definitions";
import { fetchTasksFromUserId } from "../services/fetchTasks";

export async function getUserTasks(
    request: Request<
        { userId: string },
        { status: number, message: { tasks: Task[] | [] } },
        {},
        { limit: string }
    >, response: Response) {
    const { userId } = request.params
    const { limit } = request.query
    const res = await fetchTasksFromUserId(userId, Number(limit))
    return response.status(res.status).json(res)
}