'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alergias', {
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
      fecha_registro:{
        type: Sequelize.STRING
      },
      tipoAlergia: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      familiares: {
        type: Sequelize.TEXT
      },
      personales_patologicos: {
        type: Sequelize.TEXT
      },
      personales_no_patologicos: {
        type: Sequelize.TEXT
      },
      gineco_obstetrico: {
        type: Sequelize.TEXT
      },
      tipoHabito: {
        type: Sequelize.STRING
      },
      descripcionHa: {
        type: Sequelize.TEXT
      },
      descripcionInte: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('alergias');
  }
};