const bcrypt = require("bcryptjs"); // Librería para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Librería para manejar autenticación con tokens
const { User } = require("../models"); // Importación del modelo de usuario

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar que todos los campos estén presentes
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya está registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        // Se podría mejorar este error para evitar exponer información interna del servidor
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que se ingresen los datos requeridos
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT con duración de 1 hora
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        // Se recomienda evitar exponer detalles del error en producción
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
