'use strict';
module.exports = (sequelize, DataTypes) => {
  const Citas_Medicas = sequelize.define('Citas_Medicas', {
    codigo_p: DataTypes.STRING,
    turno: DataTypes.TEXT,
    medico: DataTypes.TEXT,
    id_especialidad: DataTypes.TEXT,
    hora: DataTypes.TEXT,
    saldo_total:DataTypes.DOUBLE
  }, {});
  Citas_Medicas.associate = function(models) {
    // associations can be defined here
  };
  return Citas_Medicas;
};