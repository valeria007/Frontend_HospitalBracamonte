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
  // lista de pacientes
  static getPaciente(req, res) {
    return Pacientes
    .findAll({
      include:[
        {model:alergias }
      ]
    })
    .then(Pacientes => res.status(200).send(Pacientes));
  }
  // lista de pacientes
  static list_only_pacientes(req, res) {
    return Pacientes
    .findAll()
    .then(Pacientes => res.status(200).send(Pacientes));
  }
  // lista de paceintes solo nombre
  static list_pacientes_name(req, res) {
    return Pacientes
    .findAll({
      attributes:['numeroHistorial','nombre','apellidop','apellidom', 'ci']
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
  static update_paciente_data(req, res) {
    const { estadocivil,ocupacion,zona,telef } = req.body    
      return Pacientes
      .findByPk(req.params.id_paciente)
      .then((data) => {
        data.update({
          estadocivil: estadocivil || data.estadocivil,
          zona: zona || data.zona,  
          telef: telef || data.telef,  
          ocupacion: ocupacion || data.ocupacion
         
        })
        .then(update => {
          res.status(200).send({
            success:true,
            msg: 'Datos actualizados',
            data: {                  
              estadocivil: estadocivil || update.estadocivil,
              zona: zona || update.zona,  
              telef: telef || update.telef,  
              ocupacion: ocupacion || update.ocupacion
              
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    
    
  }
}
        
export default Paciente;