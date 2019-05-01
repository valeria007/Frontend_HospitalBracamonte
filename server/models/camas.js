'use strict';
module.exports = (sequelize, DataTypes) => {
  const Camas = sequelize.define('Camas', {
    id_salas: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Salas',
        key: 'descripcion',
        as: 'id_salas',
      }
    },    

    descripcion: DataTypes.STRING    

  }, {});
  Camas.associate = function(models) {
    // associations can be defined here
    Camas.belongsTo(models.Salas, {
      foreignKey: 'id_salas',
      onDelete: 'CASCADE'
    });
  };
  return Camas;
};