import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener tareas", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSaved = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  return (
    <div>
      <h2 class="text-md mb-3">Bienvenido {user?.name}</h2>
      <button class="btn btn-primary w-10" onClick={logout}>Cerrar Sesión</button>

      <h3>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</h3>
      <TaskForm task={editingTask} onTaskSaved={handleTaskSaved} />

      <h3>Mis Tareas</h3>
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;