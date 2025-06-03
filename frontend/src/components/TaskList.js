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
    // <div class="auth-form">
    //   <h3 class="hdash task-item h3">Filtrar Tareas</h3>
    //   <select class="select" onChange={(e) => setFilterStatus(e.target.value)}>
    //     <option value="">Todos</option>
    //     <option value="pendiente">Pendiente</option>
    //     <option value="en progreso">En Progreso</option>
    //     <option value="completada">Completada</option>
    //   </select>
    //   <input type="date" class="input" onChange={(e) => setFilterDate(e.target.value)} />

    //   <ul class="auth-form">
    //     {filteredTasks.map((task) => (
    //       <li class="task-item" key={task.id}>
    //         <h3 class="task-item  hdash">{task.title}</h3>
    //         <p class="task-item ">{task.description}</p>
    //         <p class="task-item ">Estado: {task.status}</p>
    //         <p class="task-item ">Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}</p>

    //         {task.status !== "completada" && (
    //           <button class="button buttondash" onClick={() => onEdit(task)}>Editar</button>
    //         )}
    //         {task.status === "en progreso" && (
    //           <button class="button buttondash" onClick={() => markAsCompleted(task.id)}>Completar</button>
    //         )}
    //         <button class="button buttondash" onClick={() => onDelete(task.id)}>Eliminar</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="task-filter-container">
  <h3 className="task-title">Filtrar Tareas</h3>

  <select
    className="task-select"
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="">Todos</option>
    <option value="pendiente">Pendiente</option>
    <option value="en progreso">En Progreso</option>
    <option value="completada">Completada</option>
  </select>

  <input
    type="date"
    className="task-input"
    onChange={(e) => setFilterDate(e.target.value)}
  />

  <ul className="task-list">
    {filteredTasks.map((task) => (
      <li className="task-card" key={task.id}>
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <p className="task-status">Estado: {task.status}</p>
        <p className="task-date">
          Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}
        </p>

        <div className="task-actions">
          {task.status !== "completada" && (
            <button className="task-button" onClick={() => onEdit(task)}>
              Editar
            </button>
          )}
          {task.status === "en progreso" && (
            <button className="task-button" onClick={() => markAsCompleted(task.id)}>
              Completar
            </button>
          )}
          <button className="task-button delete" onClick={() => onDelete(task.id)}>
            Eliminar
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default TaskList;

















//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold mb-4">Filtrar Tareas</h3>
//       <div className="flex space-x-4 mb-4">
//         <select
//           className="p-2 border rounded-lg"
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="">Todos</option>
//           <option value="pendiente">Pendiente</option>
//           <option value="en progreso">En Progreso</option>
//           <option value="completada">Completada</option>
//         </select>
//         <input
//           type="date"
//           className="p-2 border rounded-lg"
//           onChange={(e) => setFilterDate(e.target.value)}
//         />
//       </div>

//       <ul className="space-y-4">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className="p-4 border rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">{task.title}</h3>
//             <p className="text-gray-600">{task.description}</p>
//             <p className="text-sm text-gray-500">Estado: {task.status}</p>
//             <p className="text-sm text-gray-500">Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}</p>
//             <div className="flex space-x-2 mt-2">
//               {task.status !== "completada" && (
//                 <button
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                   onClick={() => onEdit(task)}
//                 >Editar</button>
//               )}
//               {task.status === "en progreso" && (
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                   onClick={() => markAsCompleted(task.id)}
//                 >Completar</button>
//               )}
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => onDelete(task.id)}
//               >Eliminar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;
