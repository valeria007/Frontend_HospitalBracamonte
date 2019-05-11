'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidad = sequelize.define('Especialidad', {
    nombre: DataTypes.STRING,
    sigla: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    especilidadSNSIS: DataTypes.STRING,
    establecimientoSNIS: DataTypes.STRING
  }, {});
  Especialidad.associate = function(models) {
    // associations can be defined here
    Especialidad.hasMany(models.Salas, {
      foreignKey: 'especialidadID',
    });
  };
  return Especialidad;
};