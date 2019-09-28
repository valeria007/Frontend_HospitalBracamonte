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
      estado_update: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      estado_alta:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false   // esto va a cambiar cuando se realize el alta del paciente
      },
      historial: {
        type: Sequelize.INTEGER,
      },
      fechaIngreso: {
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
      idCama: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Camas',
          key: 'id',
          as: 'idCama'
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
      id_traslado: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'traslados',
          key: 'id',
          as: 'id_traslado'
        }
      },

      id_paciente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Pacientes',
          key: 'id',
          as: 'id_paciente'
        }
      },  
      id_especialidad:{
        type: Sequelize.INTEGER
      } ,  
      id_user:{
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
    return queryInterface.dropTable('Internaciones');
  }
};