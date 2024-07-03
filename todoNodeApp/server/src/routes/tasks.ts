import { Router } from 'express';
const router = Router()
import {
    getTasks,
    getTasksById,
    addTask,
    updateTask,
    deleteTask,
} from '../controller/tasks'

router.get("/", getTasks)
router.get("/:id", getTasksById)
router.post("/", addTask)
router.put("/", updateTask)
router.delete("/", deleteTask)

export default router;
