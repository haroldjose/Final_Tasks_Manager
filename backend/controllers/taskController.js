const { Task } = require("../models"); // Importa el modelo Task desde los modelos de la base de datos

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Validar que el título sea obligatorio
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    // Crear la nueva tarea en la base de datos con estado "pendiente" por defecto
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      status: "pendiente", // Estado inicial de la tarea
      userId: req.user.userId, // Se asocia la tarea con el usuario autenticado
    });

    res.status(201).json(newTask); // Responde con la tarea creada
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error }); // Manejo de errores del servidor
  }
};

// Obtener todas las tareas de un usuario autenticado
exports.getTasks = async (req, res) => {
  try {
    // Busca todas las tareas del usuario autenticado
    const tasks = await Task.findAll({ where: { userId: req.user.userId } });
    res.json(tasks); // Devuelve la lista de tareas
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Obtener tareas con filtros
exports.getTasksFilter = async (req, res) => {
  try {
    const { status, search, fromDate, toDate } = req.query;
    const filters = { userId: req.user.userId }; // Filtro base por usuario autenticado

    // Filtrar por estado si se proporciona
    if (status) {
      filters.status = status;
    }

    // Filtrar por búsqueda en el título (búsqueda parcial, sensible a mayúsculas y minúsculas)
    if (search) {
      filters.title = { [Op.iLike]: `%${search}%` }; // Requiere importar Op desde Sequelize
    }

    // Filtrar por rango de fechas si ambos valores están presentes
    if (fromDate && toDate) {
      filters.dueDate = { [Op.between]: [fromDate, toDate] };
    }

    // Buscar tareas con los filtros aplicados
    const tasks = await Task.findAll({ where: filters });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la tarea desde los parámetros de la URL
    const { title, description, status, dueDate } = req.body; // Datos enviados en la solicitud

    // Buscar la tarea en la base de datos y asegurarse de que pertenece al usuario autenticado
    const task = await Task.findOne({ where: { id, userId: req.user.userId } });

    // Si la tarea no existe, devolver error 404
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // No permitir modificaciones si la tarea ya está completada
    if (task.status === "completada") {
      return res.status(400).json({ message: "No puedes modificar una tarea completada" });
    }

    // No permitir volver el estado de una tarea a "pendiente" una vez que ha cambiado
    if (status === "pendiente" && task.status !== "pendiente") {
      return res.status(400).json({ message: "No puedes volver una tarea a 'pendiente'" });
    }

    // Actualizar los campos solo si se han enviado nuevos valores
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;

    // Control de flujo para cambiar de estado correctamente
    if (status) {
      if (
        (status === "en progreso" && task.status !== "pendiente") || // Solo puede pasar de "pendiente" a "en progreso"
        (status === "completada" && task.status !== "en progreso") // Solo puede pasar de "en progreso" a "completada"
      ) {
        return res.status(400).json({ message: "Cambio de estado no permitido" });
      }
      task.status = status;
    }

    await task.save(); // Guardar cambios en la base de datos
    res.json(task); // Responder con la tarea actualizada
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la tarea desde los parámetros de la URL

    // Buscar la tarea en la base de datos y asegurarse de que pertenece al usuario autenticado
    const task = await Task.findOne({ where: { id, userId: req.user.userId } });

    // Si la tarea no existe, devolver error 404
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy(); // Eliminar la tarea de la base de datos
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
