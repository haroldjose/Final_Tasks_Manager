'use strict'; // Activa el modo estricto para evitar errores comunes en JavaScript

/** @type {import('sequelize-cli').Migration} */
// Exportamos un objeto con dos métodos: `up` y `down`, usados en migraciones de Sequelize.
module.exports = {
  // Método `up`: Se ejecuta cuando aplicamos la migración
  async up(queryInterface, Sequelize) {
    // Crea una tabla llamada 'Users' con los siguientes campos:
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false, // No puede ser nulo
        autoIncrement: true, // Se incrementa automáticamente
        primaryKey: true, // Clave primaria de la tabla
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      name: {
        type: Sequelize.STRING // Nombre del usuario (cadena de texto)
      },
      email: {
        type: Sequelize.STRING // Email del usuario (cadena de texto)
      },
      password: {
        type: Sequelize.STRING // Contraseña del usuario (cadena de texto, generalmente encriptada)
      },
      createdAt: {
        allowNull: false, // No puede ser nulo
        type: Sequelize.DATE // Fecha de creación del usuario
      },
      updatedAt: {
        allowNull: false, // No puede ser nulo
        type: Sequelize.DATE // Fecha de última actualización del usuario
      }
    });
  },
  
  // Método `down`: Se ejecuta cuando se revierte la migración
  async down(queryInterface, Sequelize) {
    // Elimina la tabla 'Users' si existe
    await queryInterface.dropTable('Users');
  }
};
