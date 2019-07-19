'use strict';
module.exports = (sequelize, DataTypes) => {
  const Internaciones = sequelize.define('Internaciones', {
    historial: DataTypes.INTEGER,
    fechaIngreso: DataTypes.STRING,
    tipoPaciente: DataTypes.STRING,
    institucion: DataTypes.STRING,
    provieneDE: DataTypes.STRING,
    observacion: DataTypes.TEXT,
    especialidad: DataTypes.STRING,
    sala: DataTypes.STRING,
    cama: DataTypes.STRING,
    doctor: DataTypes.STRING,
    diagnostico: DataTypes.TEXT,
    idCama: DataTypes.INTEGER,
    idPinternacion: DataTypes.INTEGER,
    id_paciente: DataTypes.INTEGER
  }, {});
  Internaciones.associate = function(models) {
    // associations can be defined here
    Internaciones.hasMany(models.receta_internacion, {
      foreignKey: 'id_internacion',
    });
    Internaciones.hasMany(models.epicrisis, {
      foreignKey: 'id_internacion',
    });
    Internaciones.hasMany(models.nota_evolucion_Paciente, {
      foreignKey: 'id_internacion',
    });
    Internaciones.hasMany(models.orden_Intervencion, {
      foreignKey: 'id_internacion',
    });
    Internaciones.hasMany(models.diagnostico_tratamientos, {
      foreignKey: 'id_internacion',
    });


    Internaciones.belongsTo(models.Pacientes, {
      foreignKey: 'id_paciente',
      onDelete: 'CASCADE'
    });
    Internaciones.belongsTo(models.Camas, {
      foreignKey: 'idCama',
      onDelete: 'CASCADE'
    });
    Internaciones.belongsTo(models.PapeletaInternacion, {
      foreignKey: 'idPinternacion',
      onDelete: 'CASCADE'
    });
  };
  return Internaciones;
};