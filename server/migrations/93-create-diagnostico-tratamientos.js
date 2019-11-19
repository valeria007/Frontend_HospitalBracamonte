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
      estado_update: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      evolucion: {
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
      id_medico: {
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
    return queryInterface.dropTable('diagnostico_tratamientos');
  }
};