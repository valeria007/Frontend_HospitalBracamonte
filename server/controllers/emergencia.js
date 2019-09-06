import model from '../models';
import Paciente from './pacientes';

const { emergencia } = model;
const { Citas_Medicas } = model;
const { Pacientes } = model;
class Emergencias {
    static Emergencia(req, res){
        const { fechaAtencion, Nhistorial,nombreDoctor,apellidoD1,apellidoD2,motivoConsulta,diagnostico,tratamiento,observaciones,idDoctor,idEnfermera } = req.body
        const  { idCita }  = req.params
        return emergencia
        .create({
            fechaAtencion,
            Nhistorial,
            nombreDoctor,
            apellidoD1,
            apellidoD2,
            motivoConsulta,
            diagnostico,
            tratamiento,
            observaciones,
            idCita,
            idDoctor,
            idEnfermera            
        })
        .then(data => res.status(200).send({
            success: true,
            msg: "Se insertaron los datos correctamente",
            data
        }))
        .catch(error => res.status(400).send(error));       
    }
    // Servicio para para mostrar emergencias
    static getEmergencia(req, res) {
        return emergencia                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }
    //serv para mostrar emergencia segun id de cita
    static onlyEmergencia(req, res){                
        var id = req.params.id;  
        emergencia.findAll({
           where: {idCita: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    // emergencia segun historial
    static emergenciaH(req, res){                
        var historial = req.params.historial;  
        emergencia.findAll({
           where: {Nhistorial: historial},
           attributes: ['id', 'fechaAtencion','Nhistorial','nombreDoctor','apellidoD1','diagnostico','idCita'],
           include:[
               {model: Citas_Medicas,attributes: ['id'], 
               include:[{
                model: Pacientes, attributes: ['id','nombre', 'apellidop','apellidom']
               }
            
            ] }
           ]
         }).then((data) => {
           res.status(200).json(data);
        });     
    }
    static updateEmergencia(req, res) {
        const { fechaAtencion, Nhistorial,nombreDoctor,apellidoD1,apellidoD2,motivoConsulta,diagnostico,tratamiento,observaciones } = req.body
        return emergencia
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
               
              nombreDoctor: nombreDoctor || data.nombreDoctor,  
              apellidoD1: apellidoD1 || data.apellidoD1,  
              apellidoD2: apellidoD2 || data.apellidoD2,  
              motivoConsulta: motivoConsulta || data.motivoConsulta,  
              diagnostico: diagnostico || data.diagnostico,  
              tratamiento: tratamiento || data.tratamiento, 
              observaciones: observaciones || data.observaciones,                    
            })
            .then(update => {
              res.status(200).send({
                success: true,
                msg: 'Se actualizo los datos en la consulta de emergencia',
                data: {
                  
                   
                  nombreDoctor: nombreDoctor || update.nombreDoctor,  
                  apellidoD1: apellidoD1 || update.apellidoD1,  
                  apellidoD2: apellidoD2 || update.apellidoD2,  
                  motivoConsulta: motivoConsulta || update.motivoConsulta,  
                  diagnostico: diagnostico || update.diagnostico,  
                  tratamiento: tratamiento || update.tratamiento, 
                  observaciones: observaciones || update.observaciones,                    
           
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
    //este serv es para traer datos de la emergecnia segun su id 
    static dataEmergecnai(req, res){                
      var id = req.params.id;  
      emergencia.findAll({
         where: {id: id},
         attributes: ['id', 'nombreDoctor', 'apellidoD1','apellidoD2']
       }).then((data) => {
         res.status(200).json(data);
       });     
    }
    //datos de emeregencia segun id
    static emergenciaP(req, res){                
      var id = req.params.id;  
      emergencia.findAll({
         where: { id : id },
         
         include:[
             {model: Citas_Medicas,attributes: ['id'], 
             include:[{
              model: Pacientes, attributes: ['id','nombre', 'apellidop','apellidom','fechanacimiento','sexo']
             }
          
          ] }
         ]
       }).then((data) => {
         res.status(200).json(data);
      });     
    }
    
}

export default Emergencias