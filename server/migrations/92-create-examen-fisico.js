'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('examen_fisicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado_general: {
        type: Sequelize.TEXT
      },
      facies: {
        type: Sequelize.STRING
      },
      precion_arterial: {
        type: Sequelize.STRING
      },
      estado_nutricional: {
        type: Sequelize.STRING
      },
      peso: {
        type: Sequelize.STRING
      },
      frecuencia_cardiaca: {
        type: Sequelize.STRING
      },
      saturacion_oxigeno: {
        type: Sequelize.STRING
      },
      fecha_revision: {
        type: Sequelize.STRING
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Pacientes',
          key: 'id',
          as: 'id_paciente',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('examen_fisicos');
  }
};