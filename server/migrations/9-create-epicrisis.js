'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('epicrises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado_update: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
      },
      historial: {
        type: Sequelize.INTEGER
      },
      Fecha_internacion: {
        type: Sequelize.STRING
      },
      Fecha_alta: {
        type: Sequelize.STRING
      },

      datos_clinicos: {
        type: Sequelize.TEXT
      },
      diagnostico_admicion: {
        type: Sequelize.TEXT
      },
      diagnostico_egreso: {
        type: Sequelize.TEXT
      },

      condicion_egreso: {
        type: Sequelize.TEXT
      },
      causa_egreso: {
        type: Sequelize.TEXT
      },
      examenes_complementario: {
        type: Sequelize.TEXT
      },

      tratamiento_quirurgico: {
        type: Sequelize.TEXT
      },
      tratamiento_medico: {
        type: Sequelize.TEXT
      },
      complicaciones: {
        type: Sequelize.TEXT
      },

      pronostico_vital: {
        type: Sequelize.TEXT
      },
      pronostico_funcional: {
        type: Sequelize.TEXT
      },
      control_tratamiento: {
        type: Sequelize.TEXT
      },

      recomendaciones: {
        type: Sequelize.TEXT
      },
      id_internacion:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Internaciones',
          key: 'id',
          as: 'id_internacion'
        }
      },
      id_medico:{
        type : Sequelize.INTEGER
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
    return queryInterface.dropTable('epicrises');
  }
};