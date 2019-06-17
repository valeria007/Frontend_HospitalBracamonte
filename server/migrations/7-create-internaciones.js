'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Internaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        type: Sequelize.STRING
      },
      tipoPaciente: {
        type: Sequelize.STRING
      },
      institucion: {
        type: Sequelize.STRING
      },
      provieneDE: {
        type: Sequelize.STRING
      },
      observacion: {
        type: Sequelize.TEXT
      },
      especialidad: {
        type: Sequelize.STRING
      },
      sala: {
        type: Sequelize.STRING
      },
      cama: {
        type: Sequelize.STRING
      },
      doctor: {
        type: Sequelize.STRING
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      IDsala: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Salas',
          key: 'id',
          as: 'IDsala'
        }
      },
      idPinternacion: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'PapeletaInternacions',
          key: 'id',
          as: 'idPinternacion'
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
    return queryInterface.dropTable('Internaciones');
  }
};