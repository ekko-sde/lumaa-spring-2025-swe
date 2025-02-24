import { Request, Response } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../models/taskModel';

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const tasks = await getTasks(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = (req as any).userId;
  try {
    const task = await createTask(title, description, userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const editTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const task = await updateTask(parseInt(id), title, description, isComplete);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteTask(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
