'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull:false,
        type: Sequelize.STRING
      },
      apellidop:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      apellidom:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      ci: {
        allowNull:false,
        type: Sequelize.STRING
      },
      fechanacimiento: {
        allowNull:false,
        type: Sequelize.STRING
      },
      edad:  {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      sexo:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      estadocivil:  {
        //allowNull:faslse,
        type: Sequelize.STRING
      },
      direccion:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      zona:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      telef: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      ocupacion:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      idiomas:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      lugranacimiento:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      departameto: {
        allowNull:false,
        type: Sequelize.STRING
      },
      provincia:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      municipio: {
        allowNull:false,
        type: Sequelize.STRING
      },
      npadre:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      apspadre: {
        allowNull:false,
        type: Sequelize.STRING
      },
      nmadre: {
        allowNull:false,
        type: Sequelize.STRING
      },
      apsmadre: {
        allowNull:false,
        type: Sequelize.STRING
      },
      nomrespon:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      aperespon:  {
        allowNull:false,
        type: Sequelize.STRING
      },
      telefres:  {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      direcres:  {
        allowNull:false,
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
    return queryInterface.dropTable('Pacientes');
  }
};