'use strict';
module.exports = (sequelize, DataTypes) => {
  const Camas = sequelize.define('Camas', {
    estado: DataTypes.BOOLEAN,
    descripcion: DataTypes.STRING,
    numeroCama: DataTypes.INTEGER,
    salaID: DataTypes.INTEGER
  }, {});
  Camas.associate = function(models) {
    // associations can be defined here
    Camas.belongsTo(models.Salas, {
      foreignKey: 'salaID',
      onDelete: 'CASCADE'
    });
  };
  return Camas;
};