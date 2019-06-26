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
      estado: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
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
      especialidad: {
        type: Sequelize.STRING
      },
      idConsultaMedica:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Consultas',
          key: 'id',
          as: 'idConsultaMedica',
        }
      },
      idEmergencia:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'emergencia',
          key: 'id',
          as: 'idEmergencia',
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
    return queryInterface.dropTable('PapeletaInternacions');
  }
};