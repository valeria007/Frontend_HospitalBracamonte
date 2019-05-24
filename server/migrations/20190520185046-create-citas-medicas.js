'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Citas_Medicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo_p: {
        type: Sequelize.STRING
      },
      turno: {
        type: Sequelize.TEXT
      },
      medico: {
        type: Sequelize.TEXT
      },
      especialidad: {
        type: Sequelize.STRING
      },
      id_especialidad: {
        type: Sequelize.TEXT
      },
      hora: {
        type: Sequelize.TEXT
      },
      saldo_total: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('Citas_Medicas');
  }
};