'use strict'; // Activa el modo estricto para evitar errores comunes en JavaScript

/** @type {import('sequelize-cli').Migration} */
// Exportamos un objeto con dos métodos: `up` y `down`, utilizados para las migraciones de Sequelize
module.exports = {
  // Método `up`: Se ejecuta al aplicar la migración, crea la tabla 'Tasks'
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', { // Crea la tabla 'Tasks'
      id: {
        allowNull: false, // No puede ser nulo
        autoIncrement: true, // Se incrementa automáticamente
        primaryKey: true, // Es la clave primaria de la tabla
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      title: {
        type: Sequelize.STRING // Título de la tarea (cadena de texto)
      },
      description: {
        type: Sequelize.STRING // Descripción de la tarea (cadena de texto)
      },
      status: {
        type: Sequelize.STRING // Estado de la tarea (ejemplo: "pendiente", "en progreso", "completada")
      },
      dueDate: {
        type: Sequelize.DATE // Fecha de vencimiento de la tarea
      },
      userId: {
        type: Sequelize.INTEGER // Relación con la tabla 'Users' (usuario al que pertenece la tarea)
      },
      createdAt: {
        allowNull: false, // No puede ser nulo
        type: Sequelize.DATE // Fecha de creación de la tarea
      },
      updatedAt: {
        allowNull: false, // No puede ser nulo
        type: Sequelize.DATE // Fecha de última actualización de la tarea
      }
    });
  },

  // Método `down`: Se ejecuta al revertir la migración, elimina la tabla 'Tasks'
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks'); // Elimina la tabla 'Tasks' si existe
  }
};
