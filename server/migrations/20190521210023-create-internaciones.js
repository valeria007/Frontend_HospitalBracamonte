'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Internaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      historial: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.TEXT
      },
      apellido1: {
        type: Sequelize.TEXT
      },
      apellido2: {
        type: Sequelize.TEXT
      },
      edad: {
        type: Sequelize.INTEGER
      },
      tipoPaciente: {
        type: Sequelize.STRING
      },
      institucion: {
        type: Sequelize.STRING
      },
      provieneDE: {
        type: Sequelize.STRING
      },
      observacion: {
        type: Sequelize.TEXT
      },
      especialidad: {
        type: Sequelize.STRING
      },
      sala: {
        type: Sequelize.STRING
      },
      cama: {
        type: Sequelize.STRING
      },
      doctor: {
        type: Sequelize.STRING
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      IDemergencia: {
        type: Sequelize.INTEGER
      },
      IDConsulta: {
        type: Sequelize.INTEGER
      },
      IDsala: {
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
    return queryInterface.dropTable('Internaciones');
  }
};