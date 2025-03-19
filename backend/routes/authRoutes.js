const express = require("express"); // Importa Express para manejar rutas

const { register, login } = require("../controllers/authController"); // Importa las funciones `register` y `login` del controlador de autenticación

// Crea un enrutador de Express
const router = express.Router();

// Define la ruta para registrar un usuario (método POST)
router.post("/register", register);

// Define la ruta para iniciar sesión (método POST)
router.post("/login", login);

// Exporta el enrutador para que pueda ser utilizado en la aplicación principal
module.exports = router;
