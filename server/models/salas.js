'use strict';
module.exports = (sequelize, DataTypes) => {
  const Salas = sequelize.define('Salas', {
    servico: {
      type: DataTypes.STRING,
      references: {
        model: 'Servicios',
        key: 'descripcion',
        as: 'servico'
      },      
    },   
    descripcion:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Por favor introdusca una description'
      }
    }, 
    piso:DataTypes.INTEGER
      
     
  }, {});
  Salas.associate = function(models) {
    // associations can be defined here
    Salas.belongsTo(models.Servicios, {
      foreignKey: 'servico',
      onDelete: 'CASCADE'
    });

    Salas.hasMany(models.Camas, {
      foreignKey: 'id_salas',
    });
  };
  return Salas;
};

// no esta funcionando las validaciones
