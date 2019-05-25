'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultas = sequelize.define('Consultas', {
    id_cita: DataTypes.INTEGER,
    anamnesis: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    observaciones: DataTypes.TEXT

  }, {});
  Consultas.associate = function(models) {
    // associations can be defined here
  };
  return Consultas;
};