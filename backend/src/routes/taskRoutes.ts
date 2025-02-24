import express from 'express';
import { getAllTasks, addTask, editTask, removeTask } from '../controllers/taskController';
import { authenticateToken } from '../utils/jwt';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getAllTasks);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', removeTask);

export default router;
