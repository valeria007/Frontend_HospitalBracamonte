'use strict';
module.exports = (sequelize, DataTypes) => {
  const alergias = sequelize.define('alergias', {
    tipoAlergia: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
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