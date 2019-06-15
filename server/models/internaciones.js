'use strict';
module.exports = (sequelize, DataTypes) => {
  const Internaciones = sequelize.define('Internaciones', {
    historial: DataTypes.INTEGER,
    fechaIngreso: DataTypes.STRING,
    tipoPaciente: DataTypes.STRING,
    institucion: DataTypes.STRING,
    provieneDE: DataTypes.STRING,
    observacion: DataTypes.TEXT,
    especialidad: DataTypes.STRING,
    sala: DataTypes.STRING,
    cama: DataTypes.STRING,
    doctor: DataTypes.STRING,
    diagnostico: DataTypes.TEXT,
    IDsala: DataTypes.INTEGER,
    idPinternacion: DataTypes.INTEGER
  }, {});
  Internaciones.associate = function(models) {
    // associations can be defined here
    Internaciones.belongsTo(models.Salas, {
      foreignKey: 'IDsala',
      onDelete: 'CASCADE'
    });
    Internaciones.belongsTo(models.PapeletaInternacion, {
      foreignKey: 'idPinternacion',
      onDelete: 'CASCADE'
    });
  };
  return Internaciones;
};