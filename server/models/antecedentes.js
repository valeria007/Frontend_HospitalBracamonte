'use strict';
module.exports = (sequelize, DataTypes) => {
  const antecedentes = sequelize.define('antecedentes', {
    fecha_registro: DataTypes.STRING,
    familiares: DataTypes.TEXT,
    personales_patologicos: DataTypes.TEXT,
    personales_no_patologicos: DataTypes.TEXT,
    gineco_obstetrico: DataTypes.TEXT,
    descripcion: DataTypes.TEXT,
    id_paciente: DataTypes.INTEGER,
    id_medico:DataTypes.INTEGER
  }, {});
  antecedentes.associate = function(models) {
    // associations can be defined here
    antecedentes.belongsTo(models.Pacientes, {
      foreignKey: 'id_paciente',
      onDelete: 'CASCADE'
    });
  };
  return antecedentes;
};