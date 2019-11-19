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
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcionSala: {
        allowNull: false,
        type: Sequelize.STRING
      },
      piso: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      especialidadID: {        
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Especialidads',
          key: 'id',
          as: 'especialidadID',
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
    return queryInterface.dropTable('Salas');
  }
};