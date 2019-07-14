'use strict';
module.exports = (sequelize, DataTypes) => {
  const epicrisis = sequelize.define('epicrisis', {
    historial: DataTypes.INTEGER,
    Fecha_internacion:DataTypes.STRING,
    Fecha_alta:DataTypes.STRING,
    diagnostico_ingreso: DataTypes.TEXT,
    resumenExmen_clinico: DataTypes.TEXT,
    resumen_evolucion: DataTypes.TEXT,
    medicamentos_usados: DataTypes.TEXT,
    diagnosticoPos_operatorio: DataTypes.TEXT,
    intervenciones_quirurgicas: DataTypes.TEXT,
    resAnatomia_patologica: DataTypes.TEXT,
    resAllasgos_lab: DataTypes.TEXT,
    diagnostico_final: DataTypes.TEXT,
    estadoPaciente_alta: DataTypes.TEXT,
    result_autopcia: DataTypes.TEXT,
    id_internacion: DataTypes.INTEGER
  }, {});
  epicrisis.associate = function(models) {
    // associations can be defined here
    epicrisis.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return epicrisis;
};