'use strict';
module.exports = (sequelize, DataTypes) => {
  const responsables = sequelize.define('responsables', {
    nombre: DataTypes.TEXT,
    apellido1: DataTypes.TEXT,
    apellido2: DataTypes.TEXT,
    direccion: DataTypes.TEXT,
    ci:DataTypes.INTEGER,
    telefono:DataTypes.INTEGER,
    id_paciente: DataTypes.INTEGER,
    id_register: DataTypes.INTEGER
  }, {});
  responsables.associate = function(models) {
    // associations can be defined here
    responsables.belongsTo(models.Pacientes, {
      foreignKey: 'id_paciente',
      onDelete: 'CASCADE'
    });
  };
  return responsables;
};