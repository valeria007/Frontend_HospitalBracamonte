'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pacientes = sequelize.define('Pacientes', {
    nombre: DataTypes.TEXT,
    apellidop: DataTypes.TEXT,
    apellidom: DataTypes.TEXT,
    ci: DataTypes.TEXT,
    fechanacimiento: DataTypes.DATE,
    edad: DataTypes.INTEGER,
    sexo: DataTypes.BOOLEAN,
    estocivil: DataTypes.TEXT,
    direcion: DataTypes.TEXT,
    zona: DataTypes.TEXT,
    tef: DataTypes.INTEGER,
    ocupacion: DataTypes.TEXT,
    idiomas: DataTypes.TEXT,
    lugranacimiento: DataTypes.TEXT,
    departameto: DataTypes.TEXT,
    provincia: DataTypes.TEXT,
    municipio: DataTypes.TEXT,
    npadre: DataTypes.TEXT,
    apspadre: DataTypes.TEXT,
    nmadre: DataTypes.TEXT,
    apsmadre: DataTypes.TEXT,
    nomrespon: DataTypes.TEXT,
    aperespon: DataTypes.TEXT,
    telefres: DataTypes.INTEGER,
    direcres: DataTypes.TEXT
  }, {});
  Pacientes.associate = function(models) {
    // associations can be defined here
  };
  return Pacientes;
};