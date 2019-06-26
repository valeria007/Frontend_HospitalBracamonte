'use strict';
module.exports = (sequelize, DataTypes) => {
  const PapeletaInternacion = sequelize.define('PapeletaInternacion', {
    estado: DataTypes.BOOLEAN,
    tipoConsulta: DataTypes.STRING,
    fechaIngreso: DataTypes.STRING,
    Historial: DataTypes.INTEGER,
    nombreDoctor: DataTypes.TEXT,
    apellidoD1: DataTypes.TEXT,
    apellidoD2: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    especialidad: DataTypes.STRING,
    idConsultaMedica: DataTypes.INTEGER,
    idEmergencia: DataTypes.INTEGER
  }, {});
  PapeletaInternacion.associate = function(models) {
    // associations can be defined here
    PapeletaInternacion.hasMany(models.Internaciones, {
      foreignKey: 'idPinternacion',
    });
    PapeletaInternacion.belongsTo(models.Consultas, {
      foreignKey: 'idConsultaMedica',
      onDelete: 'CASCADE'
    });
    PapeletaInternacion.belongsTo(models.emergencia, {
      foreignKey: 'idEmergencia',
      onDelete: 'CASCADE'
    });
  };
  return PapeletaInternacion;
};