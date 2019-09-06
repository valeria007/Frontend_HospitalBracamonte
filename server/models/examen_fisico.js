'use strict';
module.exports = (sequelize, DataTypes) => {
  const examen_fisico = sequelize.define('examen_fisico', {
    peso: DataTypes.STRING,
    talla: DataTypes.STRING,
    temperatura: DataTypes.STRING,
    frecuencia_cardiaca: DataTypes.STRING,
    respiracion: DataTypes.STRING,
    presion: DataTypes.STRING,
    saturacion_oxigeno: DataTypes.STRING,
    fecha_revision: DataTypes.STRING,
    otros:DataTypes.TEXT,
    id_paciente: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
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