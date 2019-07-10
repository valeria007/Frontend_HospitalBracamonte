'use strict';
module.exports = (sequelize, DataTypes) => {
  const receta_internacion = sequelize.define('receta_internacion', {
    receta_de: DataTypes.STRING,
    historial: DataTypes.INTEGER,
    fechaEmicion: DataTypes.STRING,
    nombre_doctor: DataTypes.TEXT,
    medicamentos: DataTypes.JSON,
    id_internacion: DataTypes.INTEGER
  }, {});
  receta_internacion.associate = function(models) {
    // associations can be defined here
    receta_internacion.belongsTo(models.Internaciones, {
      foreignKey: 'id_internacion',
      onDelete: 'CASCADE'
    });
  };
  return receta_internacion;
};