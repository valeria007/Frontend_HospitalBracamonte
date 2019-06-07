'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pacientes = sequelize.define('Pacientes', {
    numeroHistorial: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellidop: DataTypes.STRING,
    apellidom: DataTypes.STRING,
    ci: DataTypes.STRING,
    fechanacimiento: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    estadocivil: DataTypes.STRING,
    direccion: DataTypes.STRING,
    zona: DataTypes.STRING,
    telef: DataTypes.INTEGER,
    ocupacion: DataTypes.STRING,
    idiomas: DataTypes.STRING,
    lugranacimiento: DataTypes.STRING,
    departameto: DataTypes.STRING,
    provincia: DataTypes.STRING,
    municipio: DataTypes.STRING,
    npadre: DataTypes.STRING,
    apspadre: DataTypes.STRING,
    nmadre: DataTypes.STRING,
    apsmadre: DataTypes.STRING,
    nomrespon: DataTypes.STRING,
    aperespon: DataTypes.STRING,
    telefres: DataTypes.INTEGER,
    direcres: DataTypes.STRING
  }, {});
  Pacientes.associate = function(models) {
    // associations can be defined here
    Pacientes.hasMany(models.Citas_Medicas, {
      foreignKey: 'id_Paciente',
    });
  };
  return Pacientes;
};