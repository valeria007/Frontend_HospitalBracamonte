'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultas = sequelize.define('Consultas', {
    id_cita: DataTypes.INTEGER,
    tipoConsulta: DataTypes.STRING,
    fechaConsulta: DataTypes.STRING,
    numeroHistorial: DataTypes.INTEGER,
    apellidop: DataTypes.TEXT,
    apellidom: DataTypes.TEXT,
    nombre: DataTypes.TEXT,
    ci: DataTypes.STRING,
    sexo: DataTypes.STRING,
    fechanacimiento: DataTypes.STRING,
    anamnesis: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    observaciones: DataTypes.TEXT

  }, {});
  Consultas.associate = function(models) {
    // associations can be defined here
    Consultas.hasMany(models.Recetas, {
      foreignKey: 'id_consulta',
    });
    Consultas.belongsTo(models.Citas_Medicas, {
      foreignKey: 'id_cita',
      onDelete: 'CASCADE'
    });
  };
  return Consultas;
};