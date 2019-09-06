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
      peso: {
        type: Sequelize.STRING
      },
      talla: {
        type: Sequelize.STRING
      },
      temperatura: {
        type: Sequelize.STRING
      },
      frecuencia_cardiaca: {
        type: Sequelize.STRING
      },
      respiracion: {
        type: Sequelize.STRING
      },
      presion: {
        type: Sequelize.STRING
      },
      saturacion_oxigeno: {
        type: Sequelize.STRING
      },
      fecha_revision: {
        type: Sequelize.STRING
      },
      otros:{
        type: Sequelize.TEXT
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
      id_user:{
        type: Sequelize.INTEGER
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