import { Router } from 'express';
const router = Router()
import {
    getTasksById,
    addTask,
    updateTask,
    deleteTask,
} from '../controller/tasks'

router.get("/:taskId", getTasksById)
router.post("/", addTask)
router.put("/", updateTask)
router.delete("/", deleteTask)

export default router;
