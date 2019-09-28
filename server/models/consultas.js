'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultas = sequelize.define('Consultas', {
    id_cita: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    tipoConsulta: DataTypes.STRING,
    fechaConsulta: DataTypes.STRING,
    numeroHistorial: DataTypes.INTEGER,
    anamnesis: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    id_medico: DataTypes.INTEGER

  }, {});
  Consultas.associate = function(models) {
    // associations can be defined here
    Consultas.hasMany(models.Recetas, {
      foreignKey: 'id_consulta',
    });
    Consultas.hasMany(models.PapeletaInternacion, {
      foreignKey: 'idConsultaMedica',
    });
    Consultas.belongsTo(models.Citas_Medicas, {
      foreignKey: 'id_cita',
      onDelete: 'CASCADE'
    });
  };
  return Consultas;
};