import model from '../models';

const { Consultas } = model;
const { Citas_Medicas } = model;
const { Pacientes } = model;
class Consulta {
    
    static reg_consulta(req, res) {
        const { estado,tipoConsulta,fechaConsulta,numeroHistorial,anamnesis,diagnostico,tratamiento,observaciones} = req.body
        var  id_cita  = req.params.id_cita
        console.log(id_cita)
        return Consultas
          .create({
            id_cita,
            estado,
            tipoConsulta,
            fechaConsulta,
            numeroHistorial,
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
          where: { numeroHistorial: historial, tipoConsulta:tipoConsulta },
          //attributes: ['id', ['description', 'descripcion']]
          include:[
            { model:Citas_Medicas, attributes:['id'],
              include:[{
                model:Pacientes, attributes:[ 'id','nombre','apellidop','apellidom']
              }]
            }
          ]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
     }
     //serv para solo una consulta medica
     static onlyConsulta(req, res){                
      var id = req.params.id;  
      Consultas.findAll({
        where: {id: id},        
         //attributes: ['id', ['description', 'descripcion']]
         include:[ {model:Citas_Medicas,attributes:['id', 'medico']}]
        }).then((data) => {
          res.status(200).json(data);
        });     
      }
      //serv para solo una consulta segun su cita para poder actualizar
     static updateConsulta(req, res){                
      var id = req.params.id;  
      Consultas.findAll({
        where: {id_cita: id}
         //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
      }
      static updateCOnsPost(req, res) {
        const { estado,tipoConsulta,fechaConsulta,numeroHistorial,anamnesis,diagnostico,tratamiento,observaciones } = req.body
        return Consultas
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
              estado: estado || data.estado,
              tipoConsulta: tipoConsulta || data.tipoConsulta,  
              fechaConsulta: fechaConsulta || data.fechaConsulta,  
              numeroHistorial: numeroHistorial || data.numeroHistorial,  
              anamnesis: anamnesis || data.anamnesis,  
              diagnostico: diagnostico || data.diagnostico,  
              tratamiento: tratamiento || data.tratamiento,  
              observaciones: observaciones || data.observaciones 
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                  
                  estado: estado || update.estado,
                  tipoConsulta: tipoConsulta || update.tipoConsulta,  
                  fechaConsulta: fechaConsulta || update.fechaConsulta,  
                  numeroHistorial: numeroHistorial || update.numeroHistorial,  
                  anamnesis: anamnesis || update.anamnesis,  
                  diagnostico: diagnostico || update.diagnostico,  
                  tratamiento: tratamiento || update.tratamiento,  
                  observaciones: observaciones || update.observaciones 
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
}
    export default Consulta;


    