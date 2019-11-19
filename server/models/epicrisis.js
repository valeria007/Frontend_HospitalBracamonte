'use strict';
module.exports = (sequelize, DataTypes) => {
  const epicrisis = sequelize.define('epicrisis', {
    estado_update: DataTypes.BOOLEAN,
    historial: DataTypes.INTEGER,
    Fecha_internacion:DataTypes.STRING,
    Fecha_alta:DataTypes.STRING,

    datos_clinicos: DataTypes.TEXT,
    diagnostico_admicion: DataTypes.TEXT,
    diagnostico_egreso: DataTypes.TEXT,

    condicion_egreso: DataTypes.TEXT,
    causa_egreso: DataTypes.TEXT,
    examenes_complementario: DataTypes.TEXT,

    tratamiento_quirurgico: DataTypes.TEXT,
    tratamiento_medico: DataTypes.TEXT,
    complicaciones: DataTypes.TEXT,

    pronostico_vital: DataTypes.TEXT,
    pronostico_funcional: DataTypes.TEXT,
    control_tratamiento: DataTypes.TEXT,

    recomendaciones: DataTypes.TEXT,
    id_internacion: DataTypes.INTEGER,
    id_medico:DataTypes.INTEGER
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