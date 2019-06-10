'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recetas = sequelize.define('Recetas', {
    id_consulta: DataTypes.INTEGER,
    id_emergencia: DataTypes.INTEGER,
    tipoConsulta: DataTypes.STRING,
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
    Recetas.belongsTo(models.Consultas, {
      foreignKey: 'id_consulta',
      onDelete: 'CASCADE'
    });
    Recetas.belongsTo(models.emergencia, {
      foreignKey: 'id_emergencia',
      onDelete: 'CASCADE'
    });

  };
  return Recetas;
};