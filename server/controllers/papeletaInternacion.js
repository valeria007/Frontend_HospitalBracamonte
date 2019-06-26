import model from '../models';

const { PapeletaInternacion } = model;
const { Consultas } = model;
const { emergencia } = model;
const { Citas_Medicas } = model;
const { Pacientes } = model;
class papeletaInt{
    static enviarPapeletaINT(req, res){
          const { estado,tipoConsulta,fechaIngreso, Historial,nombreDoctor,apellidoD1,apellidoD2,diagnostico,especialidad } = req.body
          const { idConsultaMedica } = req.params
          const { idEmergencia } = req.params
          return PapeletaInternacion
          .create({
            estado,
            tipoConsulta,
            fechaIngreso, 
            Historial, 
            nombreDoctor,
            apellidoD1,
            apellidoD2,
            diagnostico,
            especialidad,
            idConsultaMedica,
            idEmergencia
          })
          .then(data => res.status(200).send({
              success: true,
              message: 'se inserto con exito',
              data
          }))
          .catch(error => res.status(400).send(error));    
    }
    //sev para mostrar las papeletas de internacion
    static verPapeletaINT(req,res){
        return PapeletaInternacion                
            .findAll()
            .then(data => res.status(200).send(data));    
    }
     //para mostrar Papeleta Internacion segun consulta
     static onlyPInternacion(req, res){                
        var id = req.params.id;  
        PapeletaInternacion.findAll({
           where: {idConsultaMedica: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }

    //serv para mostar papeleta de internacion segun emergencia
    static PEmergecia(req, res){                
      var id = req.params.id;  
      PapeletaInternacion.findAll({
         where: {idEmergencia: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
  }

    //serv para sacar las consultas de un paciente
    static getPinternacionPaciente(req, res){                
      var historial = req.params.historial;
      var tipoConsulta = req.params.tipoConsulta;
      PapeletaInternacion.findAll({
          where: { Historial: historial, tipoConsulta:tipoConsulta },
          //attributes: ['id', ['description', 'descripcion']]
          include: [
            { model: Consultas, attributes:[ 'id'],
            include:[
              { model: Citas_Medicas, attributes:['id'],
            include:[
              {model: Pacientes, attributes:['id','nombre','apellidop','apellidom','edad','sexo']}
            ]}]
           }]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
    }
    //serv para sacar lista p internaciones segun historial de emergencia
    static ListPinternacion(req, res){                
      var historial = req.params.historial;
      PapeletaInternacion.findAll({
          where: { Historial: historial, tipoConsulta : 'emeregencia' } ,
           //attributes: ['id', ['description', 'descripcion']]
          include: [
            { model: emergencia, attributes:[ 'id'],
            include:[
              { model: Citas_Medicas, attributes:['id'],
            include:[
              {model: Pacientes, attributes:['id','nombre','apellidop','apellidom','edad','sexo']}
            ] }
            ]
           }
          ]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
    }
    static upinternacion(req, res) {
      console.log(req.body, " <<<<<<<<<<<<<<<<<<<<<")
      const { tipoConsulta,fechaIngreso, Historial,nombreDoctor,apellidoD1,apellidoD2,diagnostico,especialidad } = req.body
      return PapeletaInternacion
        .findByPk(req.params.id)
        .then((data) => { 
          data.update({
            tipoConsulta: tipoConsulta || data.tipoConsulta,
            fechaIngreso: fechaIngreso || data.fechaIngreso,  
            Historial: Historial || data.Historial,  
            nombreDoctor: nombreDoctor || data.nombreDoctor,                    
            apellidoD1: apellidoD1 || data.apellidoD1,                    
            apellidoD2: apellidoD2 || data.apellidoD2,
            diagnostico: diagnostico || data.diagnostico, 
            especialidad: especialidad || data.especialidad   
          })
          .then(update => {
            res.status(200).send({
              
              message: 'Actualizado',
              data: {
                tipoConsulta: tipoConsulta || update.tipoConsulta,
                fechaIngreso: fechaIngreso || update.fechaIngreso,  
                Historial: Historial || update.Historial,  
                nombreDoctor: nombreDoctor || update.nombreDoctor,                    
                apellidoD1: apellidoD1 || update.apellidoD1,                    
                apellidoD2: apellidoD2 || update.apellidoD2,
                diagnostico: diagnostico || update.diagnostico,
                especialidad:especialidad || update.especialidad    
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
  // este serv va a mostrar los datos de tipo true solamente
  static PINterTRUE(req, res){ 
    const { especialidad } = req.params               
    PapeletaInternacion.findAll({
        where: { estado: true, especialidad:especialidad },
        //attributes: ['id', ['description', 'descripcion']]
        
      }).then((resp) => {
        res.status(200).json(resp);
      });     
  }
  // este serv va a mostrar los datos de tipo false solamente
  static PINterFALSE(req, res){ 
    const { especialidad } = req.params                   
    PapeletaInternacion.findAll({
        where: { estado: false, especialidad:especialidad },
        //attributes: ['id', ['description', 'descripcion']]
       
      }).then((resp) => {
        res.status(200).json(resp);
      });     
  }
  // para traer una sola papeleta de internacion
  static idPinternacion(req, res){ 
    const { id, tipoCons } = req.params;
    if (tipoCons == "emeregencia"){
      PapeletaInternacion.findAll({
        where: { id: id },
        //attributes: ['id', ['description', 'descripcion']]
        include: [
          { model: emergencia, attributes:[ 'id'],
          include:[
            { model: Citas_Medicas, attributes:['id'],
          include:[
            {model: Pacientes, attributes:['id','nombre','apellidop','apellidom','edad','sexo']}
          ] }
          ]
         }
        ]
      }).then((resp) => {
        res.status(200).json(resp);
      });     
    } else { // esto de aqui va a traer las consultas medicas
      PapeletaInternacion.findAll({
        where: { id: id },
        //attributes: ['id', ['description', 'descripcion']]
        include: [
          { model: Consultas, attributes:[ 'id'],
          include:[
            { model: Citas_Medicas, attributes:['id'],
          include:[
            {model: Pacientes, attributes:['id','nombre','apellidop','apellidom','edad','sexo']}
          ] }
          ]
         }
        ]
      }).then((resp) => {
        res.status(200).json(resp);
      }); 
    }               
    
  }
}

export default papeletaInt