// src/components/Tasks.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL ="http://localhost:5000";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        window.location.href = "/login";
      } else {
        alert("fail");
      }
    }
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/tasks`,
        { title: newTask, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask("");
      setNewDescription("");
      fetchTasks();
    } catch {
      alert("fail");
    }
  };

  const handleUpdateTask = async (id: number, title: string, isComplete: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { title, isComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch {
      alert("fail");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch {
      alert("fail");
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="title" />
      <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="description" />
      <button onClick={handleCreateTask}>add task</button>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <input type="text" value={task.title} onChange={(e) => handleUpdateTask(task.id, e.target.value, task.isComplete)} />
            <input type="checkbox" checked={task.isComplete} onChange={() => handleUpdateTask(task.id, task.title, !task.isComplete)} />
            <button onClick={() => handleDeleteTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
