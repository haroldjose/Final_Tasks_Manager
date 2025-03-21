require("dotenv").config(); // Carga las variables de entorno desde el archivo `.env`

const express = require("express"); // Importa Express para manejar el servidor y las rutas
const cors = require("cors"); // Importa CORS para permitir solicitudes desde diferentes dominios
const { sequelize } = require("./models"); // Importa la instancia de Sequelize para la base de datos

// Importa las rutas de autenticación y tareas
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express(); // Crea una instancia de Express

const corsOptions = {
  origin: 'https://final-tasks-manager.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions)); // Habilita CORS para permitir solicitudes desde otros dominios

app.use(express.json()); // Habilita la interpretación de JSON en las solicitudes entrantes


// Define las rutas de la API, rutas relacionadas con autenticación y tareas
app.use("/api/auth", authRoutes);  
app.use("/api/tasks", taskRoutes);  

const PORT = process.env.PORT || 3001; // Define el puerto del servidor, usando 3001 por defecto

// Conecta la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => console.error("Error al conectar con la base de datos:", err));
