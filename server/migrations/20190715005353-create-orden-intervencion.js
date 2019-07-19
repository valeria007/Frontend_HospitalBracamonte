'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orden_Intervencions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fechaOrden: {
        type: Sequelize.STRING
      },
      motivoInternacion: {
        type: Sequelize.TEXT
      },
      resumneDatosClinicos: {
        type: Sequelize.TEXT
      },
      examenComplementario: {
        type: Sequelize.TEXT
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      resumenEgreso: {
        type: Sequelize.TEXT
      },
      tratamientoIndicado: {
        type: Sequelize.TEXT
      },
      diagnosticoEgreso: {
        type: Sequelize.TEXT
      },
      planManejoTratamiento: {
        type: Sequelize.TEXT
      },
      resAutopcia: {
        type: Sequelize.TEXT
      },
      observacion: {
        type: Sequelize.TEXT
      },
      condicionEgreso: {
        type: Sequelize.STRING
      },
      CausaEgreso: {
        type: Sequelize.STRING
      },
      id_internacion: {
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
    return queryInterface.dropTable('orden_Intervencions');
  }
};