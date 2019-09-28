'use strict';
module.exports = (sequelize, DataTypes) => {
  const diagnostico_tratamientos = sequelize.define('diagnostico_tratamientos', {
    estado_update: DataTypes.BOOLEAN,
    historial: DataTypes.INTEGER,
    fecha: DataTypes.STRING,
    evolucion: DataTypes.TEXT,
    
    medicamentos: DataTypes.JSON,
    estudios: DataTypes.JSON,
    id_internacion : DataTypes.INTEGER,
    id_medico : DataTypes.INTEGER
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