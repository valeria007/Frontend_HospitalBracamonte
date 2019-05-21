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
        type: Sequelize.TEXT
      },
      apellidop: {
        type: Sequelize.TEXT
      },
      apellidom: {
        type: Sequelize.TEXT
      },
      ci: {
        type: Sequelize.TEXT
      },
      fechanacimiento: {
        type: Sequelize.DATE
      },
      edad: {
        type: Sequelize.INTEGER
      },
      sexo: {
        type: Sequelize.BOOLEAN
      },
      estadocivil: {
        type: Sequelize.TEXT
      },
      direccion: {
        type: Sequelize.TEXT
      },
      zona: {
        type: Sequelize.TEXT
      },
      telef: {
        type: Sequelize.INTEGER
      },
      ocupacion: {
        type: Sequelize.TEXT
      },
      idiomas: {
        type: Sequelize.TEXT
      },
      lugranacimiento: {
        type: Sequelize.TEXT
      },
      departameto: {
        type: Sequelize.TEXT
      },
      provincia: {
        type: Sequelize.TEXT
      },
      municipio: {
        type: Sequelize.TEXT
      },
      npadre: {
        type: Sequelize.TEXT
      },
      apspadre: {
        type: Sequelize.TEXT
      },
      nmadre: {
        type: Sequelize.TEXT
      },
      apsmadre: {
        type: Sequelize.TEXT
      },
      nomrespon: {
        type: Sequelize.TEXT
      },
      aperespon: {
        type: Sequelize.TEXT
      },
      telefres: {
        type: Sequelize.INTEGER
      },
      direcres: {
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
    return queryInterface.dropTable('Pacientes');
  }
};