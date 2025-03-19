const jwt = require("jsonwebtoken"); // Importa la librería jsonwebtoken para manejar tokens JWT

// Middleware para autenticar solicitudes mediante JWT
module.exports = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.header("Authorization");

    // Verificar si el token está presente en la solicitud
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        // Remover "Bearer " del token si está presente y verificar su validez
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        // Guardar los datos del usuario decodificados en la solicitud para su uso posterior
        req.user = decoded;

        // Pasar al siguiente middleware o controlador
        next();
    } catch (error) {
        // Capturar cualquier error en la verificación del token y devolver un mensaje de error
        res.status(400).json({ message: "Token no válido" });
    }
};
