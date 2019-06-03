'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PapeletaInternacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoConsulta: {
        type: Sequelize.STRING
      },
      fechaIngreso: {
        type: Sequelize.STRING
      },
      Historial: {
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
      sexo: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.STRING
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
      diagnostico: {
        type: Sequelize.TEXT
      },
      idConsultaMedica:{
        type: Sequelize.INTEGER
      },
      idEmergencia:{
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
    return queryInterface.dropTable('PapeletaInternacions');
  }
};