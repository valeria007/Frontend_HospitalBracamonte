'use strict';
module.exports = (sequelize, DataTypes) => {
  const diagnostico_tratamientos = sequelize.define('diagnostico_tratamientos', {
    historial: DataTypes.INTEGER,
    fecha: DataTypes.STRING,
    sintomas: DataTypes.TEXT,
    examenFisico: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
    medicamentos: DataTypes.JSON,
    estudios: DataTypes.JSON,
    id_internacion : DataTypes.INTEGER
  }, {});
  diagnostico_tratamientos.associate = function(models) {
    // associations can be defined here
    diagnostico_tratamientos.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return diagnostico_tratamientos;
};