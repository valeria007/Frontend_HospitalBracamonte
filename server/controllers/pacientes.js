import model from '../models';

const { Pacientes } = model;
const { alergias } = model;

  class Paciente {
    static registroPaciente(req, res) {
      const {   numeroHistorial,nombre,apellidop,apellidom, ci, fechanacimiento, 
        sexo, estadocivil, direccion, zona, telef, ocupacion, idiomas, lugranacimiento, 
        departameto, provincia, municipio,id_user} = req.body
        return Pacientes
          .create({
            numeroHistorial,
            nombre,
            apellidop,
            apellidom,
            ci,
            fechanacimiento,
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
            id_user
           })
           .then(pacienteData => res.status(201).send({
              success: true,
              message: 'Paciente creado',
              pacienteData
            }))
       }
  static getPaciente(req, res) {
    return Pacientes
    .findAll({
      include:[
        {model:alergias }
      ]
    })
    .then(Pacientes => res.status(200).send(Pacientes));
  }

  // alergias
  static paciente_alergias(req, res) {
    const{ id_paciente } = req.params
    return alergias
    .findAll({
      where: { id_paciente: id_paciente }
    })
    .then(Pacientes => res.status(200).send(Pacientes));
  }

//Only paciente
  static OnlyPaciente(req, res){
    var id = req.params.id;  
    Pacientes.findAll({
      where: {numeroHistorial : id}
        //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });  
  }

  static paciente_id(req, res){
    var id = req.params.id;  
    Pacientes.findAll({
      where: {id : id}
        //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });  
  }
}
        
export default Paciente;