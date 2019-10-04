'use strict';
module.exports = (sequelize, DataTypes) => {
  const traslados = sequelize.define('traslados', {
    estado:DataTypes.BOOLEAN,
    estado_upadte: DataTypes.BOOLEAN,
    historial: DataTypes.INTEGER,
    nombre_doctor:DataTypes.TEXT,
    fecha_hora: DataTypes.STRING,
    enviado_de: DataTypes.STRING,
    operaciones: DataTypes.TEXT,
    diagnostico_principal: DataTypes.TEXT,
    otros_diagnosticos: DataTypes.TEXT,
    causa_externa: DataTypes.TEXT,
    id_paleta_internacion: DataTypes.INTEGER,
    id_internacio: DataTypes.INTEGER,
    id_medico: DataTypes.INTEGER,
    id_especialidad: DataTypes.INTEGER

  }, {});
  traslados.associate = function(models) {
    // associations can be defined here
    traslados.hasMany(models.Internaciones, {
      foreignKey: 'id_traslado',
    });


    traslados.belongsTo(models.PapeletaInternacion, {
      foreignKey: 'id_paleta_internacion',
      onDelete: 'CASCADE'
    });
  };
  return traslados;
};