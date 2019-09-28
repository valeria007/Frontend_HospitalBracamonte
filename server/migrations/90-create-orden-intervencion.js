'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orden_Intervencions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado_update:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      historial: {
        type: Sequelize.INTEGER
      },
      fechaOrden: {
        type: Sequelize.STRING
      },
      nombre_cirujano:{
        type: Sequelize.TEXT
      },
      ayudantes:{
        type: Sequelize.TEXT
      },
      diag_pre_operatorio:{
        type: Sequelize.TEXT
      },
      intr_parcticada:{
        type: Sequelize.TEXT
      },
      diag_pos_operatorio:{
        type: Sequelize.TEXT
      },
      id_internacion: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Internaciones',
          key: 'id',
          as: 'id_internacion'
        }
      },
      id_medico: {
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
    return queryInterface.dropTable('orden_Intervencions');
  }
};