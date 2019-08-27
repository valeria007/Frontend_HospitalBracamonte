'use strict';
module.exports = (sequelize, DataTypes) => {
  const alergias = sequelize.define('alergias', {
    tipoAlergia: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    familiares: DataTypes.TEXT,
    personales_patologicos: DataTypes.TEXT,
    personales_no_patologicos: DataTypes.TEXT,
    gineco_obstetrico: DataTypes.TEXT,
    tipoHabito: DataTypes.STRING,
    descripcionHa: DataTypes.TEXT,
    descripcionInte: DataTypes.TEXT,
    id_paciente: DataTypes.INTEGER

  }, {});
  alergias.associate = function(models) {
    // associations can be defined here
    alergias.belongsTo(models.Pacientes, {
      foreignKey: 'id_paciente',
      onDelete: 'CASCADE'
    });
  };
  return alergias;
};