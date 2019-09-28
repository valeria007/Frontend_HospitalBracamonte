'use strict';
module.exports = (sequelize, DataTypes) => {
  const orden_Intervencion = sequelize.define('orden_Intervencion', {
    historial: DataTypes.INTEGER,
    fechaOrden: DataTypes.STRING,
    nombre_cirujano: DataTypes.TEXT,
    ayudantes: DataTypes.TEXT,
    diag_pre_operatorio: DataTypes.TEXT,
    intr_parcticada: DataTypes.TEXT,
    diag_pos_operatorio: DataTypes.TEXT,
    id_internacion: DataTypes.INTEGER,
    id_medico: DataTypes.INTEGER
  }, {});
  orden_Intervencion.associate = function(models) {
    // associations can be defined here
    orden_Intervencion.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return orden_Intervencion;
};