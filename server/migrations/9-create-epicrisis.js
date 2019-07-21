'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('epicrises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      historial: {
        type: Sequelize.INTEGER
      },
      Fecha_internacion: {
        type: Sequelize.STRING
      },
      Fecha_alta: {
        type: Sequelize.STRING
      },
      diagnostico_ingreso: {
        type: Sequelize.TEXT
      },
      resumenExmen_clinico: {
        type: Sequelize.TEXT
      },
      resumen_evolucion: {
        type: Sequelize.TEXT
      },
      medicamentos_usados: {
        type: Sequelize.TEXT
      },
      diagnosticoPos_operatorio: {
        type: Sequelize.TEXT
      },
      intervenciones_quirurgicas: {
        type: Sequelize.TEXT
      },
      resAnatomia_patologica: {
        type: Sequelize.TEXT
      },
      resAllasgos_lab: {
        type: Sequelize.TEXT
      },
      diagnostico_final: {
        type: Sequelize.TEXT
      },
      estadoPaciente_alta: {
        type: Sequelize.TEXT
      },
      result_autopcia: {
        type: Sequelize.TEXT
      },
      id_internacion:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Internaciones',
          key: 'id',
          as: 'id_internacion'
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
    return queryInterface.dropTable('epicrises');
  }
};