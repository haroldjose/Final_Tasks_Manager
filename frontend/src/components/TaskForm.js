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
            console.error("Error al guardar tarea", error);
        }
    };

    const voidForm =() =>{
        setTitle("");
        setDescription("");
        setStatus("Pendiente");
        setDueDate("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button class="btn btn-primary w-10" type="submit">{task ? "Actualizar" : "Crear"} Tarea</button>
        </form>
    );
};

export default TaskForm;