'use strict';
module.exports = (sequelize, DataTypes) => {
  const Camas = sequelize.define('Camas', {
    historial: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    descripcion: DataTypes.STRING,
    numeroCama: DataTypes.INTEGER,
    salaID: DataTypes.INTEGER
  }, {});
  Camas.associate = function(models) {
    // associations can be defined here
    Camas.hasMany(models.Internaciones, {
      foreignKey: 'idCama',
    });
    Camas.belongsTo(models.Salas, {
      foreignKey: 'salaID',
      onDelete: 'CASCADE'
    });
  };
  return Camas;
};