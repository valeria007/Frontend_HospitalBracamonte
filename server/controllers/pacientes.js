import model from '../models';

const { pacientes} = model;

  class Pacientes {
    static registroPaciente(req, res) {
      const { nombre,apellidop,apellidom,ci,fechanacimiento,sexo,estadocivil,direccion,zona,
    telef,ocupacion,idiomas,lugranacimiento,departameto,provincia,municipio,npadre,apspadre,nmadre,apsmadre,
    nomrespon,aperespon,telefres,direcres} = req.body
        return paciente
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
       return pacientes
    .findAll()
    .then(Pacientes => res.status(200).send(Pacientes));
  }
}
        
export default Pacientes;