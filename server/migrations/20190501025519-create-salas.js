'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Salas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      servico: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Servicios',
          key: 'descripcion',
          as: 'servico',
        }
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      piso: {
        allowNull:true,
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
    return queryInterface.dropTable('Salas');
  }
};