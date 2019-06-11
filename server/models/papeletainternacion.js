'use strict';
module.exports = (sequelize, DataTypes) => {
  const PapeletaInternacion = sequelize.define('PapeletaInternacion', {
    tipoConsulta: DataTypes.STRING,
    fechaIngreso: DataTypes.STRING,
    Historial: DataTypes.INTEGER,
    nombre: DataTypes.TEXT,
    apellido1: DataTypes.TEXT,
    apellido2: DataTypes.TEXT,
    sexo: DataTypes.STRING,
    edad: DataTypes.STRING,
    nombreDoctor: DataTypes.TEXT,
    apellidoD1: DataTypes.TEXT,
    apellidoD2: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    idConsultaMedica: DataTypes.INTEGER,
    idEmergencia: DataTypes.INTEGER
  }, {});
  PapeletaInternacion.associate = function(models) {
    // associations can be defined here
    PapeletaInternacion.belongsTo(models.Consultas, {
      foreignKey: 'idConsultaMedica',
      onDelete: 'CASCADE'
    });
    PapeletaInternacion.belongsTo(models.emergencia, {
      foreignKey: 'idEmergencia',
      onDelete: 'CASCADE'
    });
  };
  return PapeletaInternacion;
};