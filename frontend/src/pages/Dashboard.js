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
    <div class="auth-form">
      <div>
        <h2 class="hdash">Bienvenido {user?.name}</h2>
        <button class="button buttondash"onClick={logout}>Cerrar Sesión</button>
      </div>
      <h3 class="hdash">{editingTask ? "Editar Tarea" : "Nueva Tarea"}</h3>
      <TaskForm  task={editingTask} onTaskSaved={handleTaskSaved} />

      <h3 class="hdash">Mis Tareas</h3>
      <TaskList  tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div >
    // <div className="dashboard-container">
    //   <div className="dashboard-header">
    //     <h2 className="dashboard-title">Bienvenido Sr(a)., {user?.name}</h2>
    //     <button className="dashboard-logout" onClick={logout}>
    //       Cerrar Sesión
    //     </button>
    //   </div>

    //   <div className="dashboard-section">
    //     <h3 className="dashboard-subtitle">
    //       {editingTask ? "Editar Tarea" : "Nueva Tarea"}
    //     </h3>
    //     <TaskForm task={editingTask} onTaskSaved={handleTaskSaved} />
    //   </div>

    //   <div className="dashboard-section">
    //     <h3 className="dashboard-subtitle">Mis Tareas</h3>
    //     <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    //   </div>
    // </div>
    

  );
};

export default Dashboard;












































// import { useEffect, useState } from "react";
// import API from "../api";
// import { useAuth } from "../context/AuthContext";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";


// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/tasks");
//       setTasks(res.data);
//     } catch (error) {
//       console.error("Error al obtener tareas", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleTaskSaved = () => {
//     setEditingTask(null);
//     fetchTasks();
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       await API.delete(`/tasks/${taskId}`);
//       fetchTasks();
//     } catch (error) {
//       console.error("Error al eliminar tarea", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold">Bienvenido {user?.name}</h2>
//           <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Cerrar Sesión</button>
//         </div>
//         <h3 className="text-xl font-medium mb-2">{editingTask ? "Editar Tarea" : "Nueva Tarea"}</h3>
//         <TaskForm task={editingTask} onTaskSaved={handleTaskSaved} />

//         <h3 className="text-xl font-medium mt-6">Mis Tareas</h3>
//         <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;