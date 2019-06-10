'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Consultas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cita: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Citas_Medicas',
          key: 'id',
          as: 'id_cita',
        }
      },
      tipoConsulta: {
        type: Sequelize.STRING
      },
      fechaConsulta:{
        type: Sequelize.STRING
      },
      numeroHistorial:{
        type: Sequelize.INTEGER
      },
      apellidop:{
        type: Sequelize.TEXT
      },
      apellidom:{
        type: Sequelize.TEXT
      },
      nombre:{
        type: Sequelize.TEXT
      },
      ci:{
        type: Sequelize.STRING
      },
      sexo:{
        type: Sequelize.STRING
      },
      fechanacimiento:{
        type: Sequelize.STRING
      },
      anamnesis: {
        type: Sequelize.TEXT
      },
      diagnostico: {
        type: Sequelize.TEXT
      },
      tratamiento: {
        type: Sequelize.TEXT
      },
      observaciones: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Consultas');
  }
};