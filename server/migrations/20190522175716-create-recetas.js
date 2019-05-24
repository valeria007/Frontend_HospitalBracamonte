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
        type: Sequelize.INTEGER
      },
      farmaco: {
        type: Sequelize.TEXT
      },
      indicaciones: {
        type: Sequelize.TEXT
      },
      fecha: {
        type: Sequelize.DATE
      },
      unidades: {
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