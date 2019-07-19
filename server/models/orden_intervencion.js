'use strict';
module.exports = (sequelize, DataTypes) => {
  const orden_Intervencion = sequelize.define('orden_Intervencion', {
    historial: DataTypes.INTEGER,
    fechaOrden: DataTypes.STRING,
    motivoInternacion: DataTypes.TEXT,
    resumneDatosClinicos: DataTypes.TEXT,
    examenComplementario: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    resumenEgreso: DataTypes.TEXT,
    tratamientoIndicado: DataTypes.TEXT,
    diagnosticoEgreso: DataTypes.TEXT,
    planManejoTratamiento: DataTypes.TEXT,
    resAutopcia: DataTypes.TEXT,
    observacion: DataTypes.TEXT,
    condicionEgreso: DataTypes.STRING,
    CausaEgreso: DataTypes.STRING,
    id_internacion: DataTypes.INTEGER
  }, {});
  orden_Intervencion.associate = function(models) {
    // associations can be defined here
    orden_Intervencion.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return orden_Intervencion;
};