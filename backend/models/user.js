// Exporta una función que define el modelo `User` en Sequelize
module.exports = (sequelize, DataTypes) => {
  // Define el modelo `User` con sus atributos
  const User = sequelize.define("User", {
    name: { 
      type: DataTypes.STRING, // Nombre del usuario (cadena de texto)
      allowNull: false // Es obligatorio
    },
    email: { 
      type: DataTypes.STRING, // Email del usuario (cadena de texto)
      allowNull: false, // Es obligatorio
      unique: true // No permite correos electrónicos duplicados
    },
    password: { 
      type: DataTypes.STRING, // Contraseña del usuario (se almacenará en formato hash)
      allowNull: false // Es obligatoria
    }
  });

  // Define la relación de `User` con el modelo `Task`
  User.associate = (models) => {
    User.hasMany(models.Task, { 
      foreignKey: "userId", // Define la clave foránea en `Task`
      onDelete: "CASCADE" // Si un usuario es eliminado, sus tareas también se eliminan
    });
  };

  return User; // Retorna el modelo `User`
};
