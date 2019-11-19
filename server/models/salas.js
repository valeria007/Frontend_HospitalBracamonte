'use strict';
module.exports = (sequelize, DataTypes) => {
  const Salas = sequelize.define('Salas', {
    nombre: DataTypes.STRING,
    descripcionSala: DataTypes.STRING,
    piso: DataTypes.STRING,
    especialidadID: DataTypes.INTEGER
  }, {});
  Salas.associate = function(models) {
    // associations can be defined here
    Salas.hasMany(models.Camas, {
      foreignKey: 'salaID',
    });
    Salas.belongsTo(models.Especialidad, {
      foreignKey: 'especialidadID',
      onDelete: 'CASCADE'
    });
  };
  return Salas;
};