import { useState } from "react";
import API from "../api";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const markAsCompleted = async (taskId) => {
    try {
      await API.patch(`/tasks/${taskId}`, { status: "completada" });
      onEdit();
    } catch (error) {
      console.error("Error al completar tarea", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterStatus === "" || task.status === filterStatus) &&
      (filterDate === "" || task.dueDate?.startsWith(filterDate))
    );
  });

  return (
    <div>
      <h3>Filtrar Tareas</h3>
      <select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completada">Completada</option>
      </select>
      <input type="date" onChange={(e) => setFilterDate(e.target.value)} />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.status}</p>
            <p>Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}</p>

            {task.status !== "completada" && (
              <button onClick={() => onEdit(task)}>Editar</button>
            )}
            {task.status === "en progreso" && (
              <button class="btn btn-primary w-10" onClick={() => markAsCompleted(task.id)}>Completar</button>
            )}
            <button class="btn btn-primary w-10" onClick={() => onDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;