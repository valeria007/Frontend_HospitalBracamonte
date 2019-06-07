'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emergencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoAtencion: {
        type: Sequelize.STRING
      },
      Nhistorial: {
        type: Sequelize.BIGINT
      },
      nombreDoctor: {
        type: Sequelize.TEXT
      },
      apellidoD1: {
        type: Sequelize.TEXT
      },
      apellidoD2: {
        type: Sequelize.TEXT
      },
      motivoConsulta: {
        type: Sequelize.TEXT
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      tratamiento: {
        type: Sequelize.TEXT
      },
      observaciones: {
        type: Sequelize.TEXT
      },
      idCita: {
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
    return queryInterface.dropTable('emergencia');
  }
};