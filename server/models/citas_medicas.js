'use strict';
module.exports = (sequelize, DataTypes) => {
  const Citas_Medicas = sequelize.define('Citas_Medicas', {
    codigo_p: DataTypes.INTEGER,
    turno: DataTypes.TEXT,
    medico: DataTypes.TEXT,
    especialidad : DataTypes.STRING,
    hora: DataTypes.TEXT,
    saldo_total:DataTypes.DOUBLE,
    id_especialidad: DataTypes.INTEGER,
    id_Paciente: DataTypes.INTEGER
  }, {});
  Citas_Medicas.associate = function(models) {
    // associations can be defined here
    Citas_Medicas.belongsTo(models.Pacientes, {
      foreignKey: 'id_Paciente',
      onDelete: 'CASCADE'
    });
  };
  return Citas_Medicas;
};