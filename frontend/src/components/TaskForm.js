import { useState, useEffect } from "react";
import API from "../api";

const TaskForm = ({ task, onTaskSaved }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pendiente");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, status, dueDate };

        try {
            if (task) {
                await API.put(`/tasks/${ task.id }`, newTask);
            } else {
                await API.post("/tasks", newTask);
            }
            onTaskSaved();
            voidForm();
        } catch (error) {
            console.error("Error al guardar la tarea", error);
        }
    };

    const voidForm =() =>{
        setTitle("");
        setDescription("");
        setStatus("Pendiente");
        setDueDate("");
    }

    return (
        // <form class="auth-form task-form" onSubmit={handleSubmit}>
        //     <input class="input" type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        //     <textarea class="textarea" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
        //     <select class="select" value={status} onChange={(e) => setStatus(e.target.value)}>
        //         <option value="pendiente">Pendiente</option>
        //         <option value="en progreso">En Progreso</option>
        //         <option value="completada">Completada</option>
        //     </select>
        //     <input class="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        //     <button class="button buttondash" type="submit">{task ? "Actualizar" : "Crear"} Tarea</button>
        // </form>

        <form className="task-form" onSubmit={handleSubmit}>
  <input
    className="task-input"
    type="text"
    placeholder="Título de la tarea"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <textarea
    className="task-textarea"
    placeholder="Descripción"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <select
    className="task-select"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="pendiente">Pendiente</option>
    <option value="en progreso">En Progreso</option>
    <option value="completada">Completada</option>
  </select>

  <input
    className="task-input"
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />

  <button className="task-button" type="submit">
    {task ? "Actualizar" : "Crear"} Tarea
  </button>
</form>

    );
};

export default TaskForm;





















//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg space-y-3">
//             <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded-lg" />
//             <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg" />
//             <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-lg">
//                 <option value="pendiente">Pendiente</option>
//                 <option value="en progreso">En Progreso</option>
//                 <option value="completada">Completada</option>
//             </select>
//             <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded-lg" />
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">{task ? "Actualizar" : "Crear"} Tarea</button>
//         </form>
//     );
// };

// export default TaskForm;