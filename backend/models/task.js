// Exporta una función que define el modelo `Task` en Sequelize
module.exports = (sequelize, DataTypes) => {
  // Define el modelo `Task` con sus atributos
  const Task = sequelize.define("Task", {
    title: { 
      type: DataTypes.STRING, // Define el título como una cadena de texto
      allowNull: false // El título es obligatorio
    },
    description: DataTypes.STRING, // La descripción es opcional y de tipo string
    status: {
      type: DataTypes.STRING, // Define el estado como una cadena de texto
      allowNull: false, // Es obligatorio definir un estado
      defaultValue: "pendiente", // Valor por defecto al crear una tarea
      validate: { 
        isIn: [["pendiente", "en progreso", "completada"]] // Solo permite estos valores
      }
    },
    dueDate: DataTypes.DATE // Fecha de vencimiento de la tarea
  });

  // Define la relación de `Task` con el modelo `User`
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId" }); // Cada tarea pertenece a un usuario
  };

  return Task; // Retorna el modelo `Task`
};
