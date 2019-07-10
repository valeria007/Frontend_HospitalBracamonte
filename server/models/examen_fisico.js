'use strict';
module.exports = (sequelize, DataTypes) => {
  const examen_fisico = sequelize.define('examen_fisico', {
    estado_general: DataTypes.TEXT,
    facies: DataTypes.STRING,
    precion_arterial: DataTypes.STRING,
    estado_nutricional: DataTypes.STRING,
    peso: DataTypes.STRING,
    frecuencia_cardiaca: DataTypes.STRING,
    saturacion_oxigeno: DataTypes.STRING,
    fecha_revision: DataTypes.STRING,
    id_paciente: DataTypes.INTEGER
  }, {});
  examen_fisico.associate = function(models) {
    // associations can be defined here
    examen_fisico.belongsTo(models.Pacientes, {
      foreignKey: 'id_paciente',
      onDelete: 'CASCADE'
    });
  };
  return examen_fisico;
};