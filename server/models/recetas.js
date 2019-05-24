'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recetas = sequelize.define('Recetas', {
    id_consulta: DataTypes.INTEGER,
    farmaco: DataTypes.TEXT,
    indicaciones: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    unidades: DataTypes.INTEGER
  }, {});
  Recetas.associate = function(models) {
    // associations can be defined here
  };
  return Recetas;
};