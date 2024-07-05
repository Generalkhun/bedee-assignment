import { Request, Response } from "express";
import {
    getTasksById,
    addTask,
    addSubTask,
    updateTask,
    deleteTask
} from "../../controller/tasks";
import {
    fetchTaskFromTaskId,
} from "../../services/fetchTasks";
import {
    addTasktoDB,
    addSubTasktoDB,

} from "../../services/addTask";
import {
    updateTaskDB,
} from '../../services/updateTask'
import {
    deleteTaskDB
} from '../../services/deleteTaskDB'
import { TasksRequest } from "../../models/dataTransferObject/Task";

jest.mock('../../services/fetchTasks', () => ({
    fetchTaskFromTaskId: jest.fn(),
    fetchTasksFromUserId: jest.fn(),
}));

jest.mock('../../services/addTask', () => ({
    addTasktoDB: jest.fn(),
    addSubTasktoDB: jest.fn(),
    updateTaskDB: jest.fn(),
    deleteTaskDB: jest.fn(),
}));

jest.mock('../../services/updateTask', () => ({
    updateTaskDB: jest.fn(),
}));

jest.mock('../../services/deleteTaskDB', () => ({
    deleteTaskDB: jest.fn(),
}));

describe('Express Handlers', () => {
    let mockRequest: Partial<Request<any>>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as Partial<Response>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getTasksById should fetch task by taskId', async () => {
        const mockTask = {
            status: 200,
            body: {
                tasks: [
                    {
                        id: 'task1',
                        title: 'Learn Next.js',
                        description: 'Complete the Next.js tutorial',
                        ownerId: 'user1',
                        subtasksId: [],
                        completionStatus: 'completed',
                        createdAt: '2024-07-05T07:37:31.810Z',
                        completedAt: '2024-07-05T07:37:31.810Z',
                    },
                ],
            },
        };

        (fetchTaskFromTaskId as jest.Mock).mockResolvedValue(mockTask);

        mockRequest.params = { taskId: 'task1' };

        await getTasksById(mockRequest as Request<{ taskId: string }>, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            body: {
                tasks: [
                    {
                        id: 'task1',
                        title: 'Learn Next.js',
                        description: 'Complete the Next.js tutorial',
                        ownerId: 'user1',
                        subtasksId: [],
                        completionStatus: 'completed',
                        createdAt: '2024-07-05T07:37:31.810Z',
                        completedAt: '2024-07-05T07:37:31.810Z',
                    },
                ],
            },
            status: 200
        });
    });

    it('addTask should add a new task', async () => {
        const mockRequestData: TasksRequest.AddTask = {
            userId: 'user1',
            taskTitle: 'Learn React Native',
            taskDescription: 'Complete the React Native tutorial',
        };

        const mockTaskResponse = {
            status: 201,
            body: {},
            message: 'Task added successfully',
        };

        (addTasktoDB as jest.Mock).mockResolvedValue(mockTaskResponse);

        mockRequest.body = mockRequestData;

        await addTask(mockRequest as Request<{}, {}, TasksRequest.AddTask>, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status:201,
            message: 'Task added successfully',
            body:{}
        });
    });

    it('addSubTask should add a new subtask', async () => {
        const mockRequestData: TasksRequest.AddSubTask = {
            userId: 'user1',
            taskId: 'task1',
            subTaskId: 'subtask1-1',
        };

        const mockSubTaskResponse = {
            status: 201,
            body: {},
            message: 'Subtask added successfully',
        };

        (addSubTasktoDB as jest.Mock).mockResolvedValue(mockSubTaskResponse);

        mockRequest.body = mockRequestData;

        await addSubTask(mockRequest as Request<{}, {}, TasksRequest.AddSubTask>, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 201,
            message: 'Subtask added successfully',
            body: {},
        });
    });

    it('updateTask should update an existing task', async () => {
        const mockRequestData: TasksRequest.UpdateTask = {
            userId: 'user1',
            taskId: 'task1',
            updatingDetails: {
                completionStatus: 'inprogress',
            },
        };

        const mockUpdateResponse = {
            status: 200,
            body: {},
            message: 'Task updated successfully',
        };

        (updateTaskDB as jest.Mock).mockResolvedValue(mockUpdateResponse);

        mockRequest.body = mockRequestData;

        await updateTask(mockRequest as Request<{}, {}, TasksRequest.UpdateTask>, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 200,
            body: {},
            message: 'Task updated successfully',
        });
    });

    it('deleteTask should delete an existing task', async () => {
        const mockRequestData: TasksRequest.DeleteTask = {
            userId: 'user1',
            taskId: 'task1',
        };

        const mockDeleteResponse = {
            status: 204,
            body: {},
            message: 'Task deleted successfully',
        };

        (deleteTaskDB as jest.Mock).mockResolvedValue(mockDeleteResponse);

        mockRequest.body = mockRequestData;

        await deleteTask(mockRequest as Request<{}, {}, TasksRequest.DeleteTask>, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Task deleted successfully',
            status: 204,
            body: {},
        });
    });
});
