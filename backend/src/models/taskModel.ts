import pool from '../utils/db';

export const getTasks = async (userId: number) => {
  const result = await pool.query('SELECT * FROM tasks WHERE userId = $1', [userId]);
  return result.rows;
};

export const createTask = async (title: string, description: string, userId: number) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return result.rows[0];
};

export const updateTask = async (id: number, title: string, description: string, isComplete: boolean) => {
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *',
    [title, description, isComplete, id]
  );
  return result.rows[0];
};

export const deleteTask = async (id: number) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};
