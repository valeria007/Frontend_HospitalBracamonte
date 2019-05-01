'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Camas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_salas: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Salas',
          key: 'descripcion',
          as: 'id_salas',
        }
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Camas');
  }
};