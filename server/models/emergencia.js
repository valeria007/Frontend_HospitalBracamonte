'use strict';
module.exports = (sequelize, DataTypes) => {
  const emergencia = sequelize.define('emergencia', {
    fechaAtencion: DataTypes.STRING,
    Nhistorial: DataTypes.BIGINT,
    nombreDoctor: DataTypes.TEXT,
    apellidoD1: DataTypes.TEXT,
    apellidoD2: DataTypes.TEXT,
    motivoConsulta: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    idCita: DataTypes.INTEGER,
    idDoctor: DataTypes.STRING,
    idEnfermera: DataTypes.STRING
  }, {});
  emergencia.associate = function(models) {
    // associations can be defined here
    emergencia.hasMany(models.Recetas, {
      foreignKey: 'id_emergencia',
    });
    emergencia.belongsTo(models.Citas_Medicas, {
      foreignKey: 'idCita',
      onDelete: 'CASCADE'
    });
  };
  return emergencia;
};