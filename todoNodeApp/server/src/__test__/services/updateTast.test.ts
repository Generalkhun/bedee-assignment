import { UpdatingTaskDetails, APIResponse, Task, ErrorMessages } from "../../models/definitions";
import { mockTasks } from "../../services/mock-database/mock-data";
import { updateTaskDB } from "../../services/updateTask";

describe('updateTaskDB', () => {
  beforeEach(() => {
    // Reset the mock data to its initial state before each test
    mockTasks.length = 0;
    mockTasks.push(
      {
        id: 'task1',
        title: 'Learn Next.js',
        description: 'Complete the Next.js tutorial',
        ownerId: 'user1',
        subtasksId: [],
        completionStatus: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
      {
        id: 'task2',
        title: 'Learn TypeScript',
        description: 'Go through TypeScript documentation',
        ownerId: 'user2',
        subtasksId: ['subtask2-1', 'subtask2-2'],
        completionStatus: 'inprogress',
        createdAt: new Date().toISOString(),
      }
    );
  });

  it('should update the completion status of a task', async () => {
    const updatingDetails: UpdatingTaskDetails = { completionStatus: 'completed' };

    const response: APIResponse<{ updatedTask: Task | null }> = await updateTaskDB({
      userId: 'user2',
      taskId: 'task2',
      updatingDetails,
    });

    expect(response.status).toBe(200);
    expect(response.body.updatedTask?.completionStatus).toBe('completed');
  });

  it('should return an error if the user does not own the task', async () => {
    const updatingDetails: UpdatingTaskDetails = { completionStatus: 'completed' };

    const response: APIResponse<{ updatedTask: Task | null }> = await updateTaskDB({
      userId: 'user3',
      taskId: 'task2',
      updatingDetails,
    });

    expect(response.status).toBe(400);
    expect(response.message).toBe(ErrorMessages.USER_NOT_MATCHED);
    expect(response.body.updatedTask).toBeNull();
  });

  it('should return an error if the task is not found', async () => {
    const updatingDetails: UpdatingTaskDetails = { completionStatus: 'completed' };

    const response: APIResponse<{ updatedTask: Task | null }> = await updateTaskDB({
      userId: 'user2',
      taskId: 'nonexistent-task',
      updatingDetails,
    });

    expect(response.status).toBe(400);
    expect(response.message).toBe('some thing went wrong');
    expect(response.body.updatedTask).toBeNull();
  });

  // Add more test cases as needed
});
