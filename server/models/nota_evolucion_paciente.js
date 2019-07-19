'use strict';
module.exports = (sequelize, DataTypes) => {
  const nota_evolucion_Paciente = sequelize.define('nota_evolucion_Paciente', {
    historial: DataTypes.INTEGER,
    fecha: DataTypes.STRING,
    nota_evolucion: DataTypes.TEXT,
    id_internacion: DataTypes.INTEGER
  }, {});
  nota_evolucion_Paciente.associate = function(models) {
    // associations can be defined here
    nota_evolucion_Paciente.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return nota_evolucion_Paciente;
};