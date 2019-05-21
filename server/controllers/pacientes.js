import model from '../models';

const { Pacientes} = model;

  class Paciente {
    static registroPaciente(req, res) {
      const { nombre,apellidop,apellidom,ci,fechanacimiento,edad,sexo,estadocivil,direccion,zona,
    telef,ocupacion,idiomas,lugranacimiento,departameto,provincia,municipio,npadre,apspadre,nmadre,apsmadre,
    nomrespon,aperespon,telefres,direcres} = req.body
        return Pacientes
          .create({
            nombre,
            apellidop,
            apellidom,
            ci,
            fechanacimiento,
            edad,
            sexo,
            estadocivil,
            direccion,
            zona,
            telef,
            ocupacion,
            idiomas,
            lugranacimiento,
            departameto,
            provincia,
            municipio,
            npadre,
            apspadre,
            nmadre,
            apsmadre,
            nomrespon,
            aperespon,
            telefres,
            direcres
           })
           .then(pacienteData => res.status(201).send({
              success: true,
              message: 'Paciente creado',
              pacienteData
            }))
       }
  static getPaciente(req, res) {
       return Pacientes
    .findAll()
    .then(Pacientes => res.status(200).send(Pacientes));
  }
}
        
export default Paciente;