'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recetas = sequelize.define('Recetas', {
    id_consulta: DataTypes.INTEGER,
    historiaClinica: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    posologia: DataTypes.TEXT,
    farmaco: DataTypes.TEXT,
    viaAdmincion: DataTypes.TEXT,
    doctor: DataTypes.TEXT,
    indicaciones: DataTypes.TEXT,    
    unidades: DataTypes.INTEGER
  }, {});
  Recetas.associate = function(models) {
    // associations can be defined here
  };
  return Recetas;
};