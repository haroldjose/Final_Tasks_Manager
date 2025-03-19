const express = require("express"); // Importa Express para manejar rutas

// Importa las funciones del controlador de tareas
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  getTasksFilter 
} = require("../controllers/taskController");

// Importa el middleware de autenticación para proteger las rutas
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); // Crea un enrutador de Express


router.post("/", authMiddleware, createTask); // Crear una nueva tarea (requiere autenticación)
router.get("/", authMiddleware, getTasks); // Obtener todas las tareas del usuario autenticado
router.get("/filter/", authMiddleware, getTasksFilter);// Filtrar tareas según estado, fecha o búsqueda (requiere autenticación)
router.put("/:id", authMiddleware, updateTask); // Actualizar una tarea específica por ID (requiere autenticación)
router.delete("/:id", authMiddleware, deleteTask);// Eliminar una tarea específica por ID (requiere autenticación)

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en la aplicación principal
