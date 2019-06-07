'use strict';
module.exports = (sequelize, DataTypes) => {
  const emergencia = sequelize.define('emergencia', {
    tipoAtencion: DataTypes.STRING,
    Nhistorial: DataTypes.BIGINT,
    nombreDoctor: DataTypes.TEXT,
    apellidoD1: DataTypes.TEXT,
    apellidoD2: DataTypes.TEXT,
    motivoConsulta: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    idCita: DataTypes.INTEGER
  }, {});
  emergencia.associate = function(models) {
    // associations can be defined here
  };
  return emergencia;
};