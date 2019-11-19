'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('traslados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      estado_upadte:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      historial:{
        type: Sequelize.INTEGER
      },
      nombre_doctor:{
        type: Sequelize.TEXT
      },
      fecha_hora: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      enviado_de: {
        type: Sequelize.STRING
      },
      operaciones: {
        type: Sequelize.TEXT
      },
      diagnostico_principal: {
        type: Sequelize.TEXT
      },
      otros_diagnosticos: {
        type: Sequelize.TEXT
      },
      causa_externa: {
        type: Sequelize.TEXT
      },
      id_paleta_internacion: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'PapeletaInternacions',
          key: 'id',
          as: 'id_paleta_internacion',
        }
      },
      id_internacio: {
        type: Sequelize.INTEGER
      },
      id_medico: {
        type: Sequelize.INTEGER
      },
      id_especialidad: {
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
    return queryInterface.dropTable('traslados');
  }
};