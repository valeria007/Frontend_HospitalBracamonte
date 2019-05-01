'use strict';
module.exports = (sequelize, DataTypes) => {
  const Servicios = sequelize.define('Servicios', {
    descripcion: {
     type: DataTypes.STRING,
     allowNull: {
       args: false,
       msg: 'porfavor insrte una descripcion'
     },
     unique: {
      args: true,
      msg: 'descripcion ya existe'
    },
    },
    sigla: DataTypes.STRING
  }, {});
  Servicios.associate = function(models) {
    // associations can be defined here
    Servicios.hasMany(models.Salas, {
      foreignKey: 'servico',
    });
  };
  return Servicios;
};