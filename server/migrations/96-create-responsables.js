'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('responsables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.TEXT
      },
      apellido1: {
        type: Sequelize.TEXT
      },
      apellido2: {
        type: Sequelize.TEXT
      },
      direccion: {
        type: Sequelize.TEXT
      },
      ci: {
        type: Sequelize.INTEGER
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Pacientes',
          key: 'id',
          as: 'id_paciente',
        }
      },
      id_register:{
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
    return queryInterface.dropTable('responsables');
  }
};