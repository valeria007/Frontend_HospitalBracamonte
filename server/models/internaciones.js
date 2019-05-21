'use strict';
module.exports = (sequelize, DataTypes) => {
  const Internaciones = sequelize.define('Internaciones', {
    historial: DataTypes.INTEGER,
    nombre: DataTypes.TEXT,
    apellido1: DataTypes.TEXT,
    apellido2: DataTypes.TEXT,
    edad: DataTypes.INTEGER,
    tipoPaciente: DataTypes.STRING,
    institucion: DataTypes.STRING,
    provieneDE: DataTypes.STRING,
    observacion: DataTypes.TEXT,
    especialidad: DataTypes.STRING,
    sala: DataTypes.STRING,
    cama: DataTypes.STRING,
    doctor: DataTypes.STRING,
    diagnostico: DataTypes.TEXT,
    IDemergencia: DataTypes.INTEGER,
    IDConsulta: DataTypes.INTEGER,
    IDsala: DataTypes.INTEGER
  }, {});
  Internaciones.associate = function(models) {
    // associations can be defined here
  };
  return Internaciones;
};