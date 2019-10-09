'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_consulta: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Consultas',
          key: 'id',
          as: 'id_consulta',
        }
      },
      id_emergencia: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'emergencia',
          key: 'id',
          as: 'id_emergencia',
        }
      },
      estado: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
      },
      tipoConsulta: {
        type: Sequelize.STRING
      },
      historiaClinica: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      doctor:{
        type: Sequelize.TEXT
      },
      medicamentos: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Recetas');
  }
};