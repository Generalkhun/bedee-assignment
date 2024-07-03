import { Router } from 'express';
const router = Router()
import { getUserTasks } from '../controller/users';

router.get("/:userId", getUserTasks)

export default router;
