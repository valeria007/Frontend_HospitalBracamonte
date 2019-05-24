'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultas = sequelize.define('Consultas', {
    id_cita: DataTypes.INTEGER,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT
  }, {});
  Consultas.associate = function(models) {
    // associations can be defined here
  };
  return Consultas;
};