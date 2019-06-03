import model from '../models';

const { Consultas } = model;
class Consulta {
    
    static reg_consulta(req, res) {
        const { tipoConsulta,fechaConsulta,numeroHistorial,apellidop,apellidom,nombre,ci,sexo,fechanacimiento,anamnesis,diagnostico,tratamiento,observaciones} = req.body
        var  id_cita  = req.params.id_cita
        console.log(id_cita)
        return Consultas
          .create({
            id_cita,
            tipoConsulta,
            fechaConsulta,
            numeroHistorial,
            apellidop,
            apellidom,
            nombre,
            ci,
            sexo,
            fechanacimiento,
            anamnesis,
            diagnostico,
            tratamiento,
            observaciones
          })
           .then(consultaData => res.status(201).send({
              success: true,
              message: 'consulta guardada',
              consultaData
          }))
       }
    static getConsulta(req, res) {
        return Consultas
     .findAll()
     .then(Consultas => res.status(200).send(Consultas));
     }
     
     //serv para sacar las consultas de un paciente
     static getConsultaPaciente(req, res){                
      var historial = req.params.historial;
      var tipoConsulta = req.params.tipoConsulta;
      Consultas.findAll({
          where: { numeroHistorial: historial, tipoConsulta:tipoConsulta }
          //attributes: ['id', ['description', 'descripcion']]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
     }
     //serv para solo una consulta medica
     static onlyConsulta(req, res){                
      var id = req.params.id;  
      Consultas.findAll({
        where: {id: id}
         //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
      }
}
    export default Consulta;


    