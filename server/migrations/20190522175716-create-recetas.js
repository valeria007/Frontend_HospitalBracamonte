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
      historiaClinica: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      posologia:{
        type: Sequelize.TEXT
      },
      farmaco: {
        type: Sequelize.TEXT
      },
      viaAdmincion: {
        type: Sequelize.TEXT
      },
      doctor:{
        type: Sequelize.TEXT
      },
      indicaciones: {
        type: Sequelize.TEXT
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