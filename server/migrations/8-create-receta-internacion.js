'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receta_internacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receta_de: {
        type: Sequelize.STRING
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fechaEmicion: {
        type: Sequelize.STRING
      },
      nombre_doctor: {
        type: Sequelize.TEXT
      },
      medicamentos: {
        type: Sequelize.JSON
      },
      id_internacion: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Internaciones',
          key: 'id',
          as: 'id_internacion',
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
    return queryInterface.dropTable('receta_internacions');
  }
};