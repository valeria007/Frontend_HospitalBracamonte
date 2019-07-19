'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('diagnostico_tratamientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.STRING
      },
      sintomas: {
        type: Sequelize.TEXT
      },
      examenFisico: {
        type: Sequelize.TEXT
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      tratamiento: {
        type: Sequelize.TEXT
      },
      medicamentos: {
        type: Sequelize.JSON
      },
      estudios: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('diagnostico_tratamientos');
  }
};