import model from '../models';

const { PapeletaInternacion } = model;

class papeletaInt{
    static enviarPapeletaINT(req, res){
          const { estado,tipoConsulta,fechaIngreso, Historial, nombre,apellido1,apellido2,sexo,edad,nombreDoctor,apellidoD1,apellidoD2,diagnostico } = req.body
          const { idConsultaMedica } = req.params
          const { idEmergencia } = req.params
          return PapeletaInternacion
          .create({
            estado,
            tipoConsulta,
            fechaIngreso, 
            Historial, 
            nombre,
            apellido1,
            apellido2,
            sexo,
            edad,
            nombreDoctor,
            apellidoD1,
            apellidoD2,
            diagnostico,
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
          where: { Historial: historial, tipoConsulta:tipoConsulta }
          //attributes: ['id', ['description', 'descripcion']]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
    }
    //serv para sacar lista p internaciones segun historial de emergencia
    static ListPinternacion(req, res){                
      var historial = req.params.historial;
      PapeletaInternacion.findAll({
          where: { Historial: historial, tipoConsulta : 'emeregencia' }
          //attributes: ['id', ['description', 'descripcion']]
        }).then((resp) => {
          res.status(200).json(resp);
        });     
    }
    static upinternacion(req, res) {
      console.log(req.body, " <<<<<<<<<<<<<<<<<<<<<")
      const { tipoConsulta,fechaIngreso, Historial, nombre,apellido1,apellido2,sexo,edad,nombreDoctor,apellidoD1,apellidoD2,diagnostico } = req.body
      return PapeletaInternacion
        .findByPk(req.params.id)
        .then((data) => { 
          data.update({
            tipoConsulta: tipoConsulta || data.tipoConsulta,
            fechaIngreso: fechaIngreso || data.fechaIngreso,  
            Historial: Historial || data.Historial,  
            nombre: nombre || data.nombre,  
            apellido1: apellido1 || data.apellido1,  
            apellido2: apellido2 || data.apellido2,  
            sexo: sexo || data.sexo,  
            edad: edad || data.edad, 
            nombreDoctor: nombreDoctor || data.nombreDoctor,                    
            apellidoD1: apellidoD1 || data.apellidoD1,                    
            apellidoD2: apellidoD2 || data.apellidoD2,
            diagnostico: diagnostico || data.diagnostico    
          })
          .then(update => {
            res.status(200).send({
              
              message: 'Actualizado',
              data: {
                tipoConsulta: tipoConsulta || update.tipoConsulta,
                fechaIngreso: fechaIngreso || update.fechaIngreso,  
                Historial: Historial || update.Historial,  
                nombre: nombre || update.nombre,  
                apellido1: apellido1 || update.apellido1,  
                apellido2: apellido2 || update.apellido2,  
                sexo: sexo || update.sexo,  
                edad: edad || update.edad, 
                nombreDoctor: nombreDoctor || update.nombreDoctor,                    
                apellidoD1: apellidoD1 || update.apellidoD1,                    
                apellidoD2: apellidoD2 || update.apellidoD2,
                diagnostico: diagnostico || update.diagnostico    
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
  // este serv va a mostrar los datos de tipo true solamente
  static PINterTRUE(req, res){                
    PapeletaInternacion.findAll({
        where: { estado: true }
        //attributes: ['id', ['description', 'descripcion']]
      }).then((resp) => {
        res.status(200).json(resp);
      });     
  }
  // este serv va a mostrar los datos de tipo false solamente
  static PINterFALSE(req, res){                
    PapeletaInternacion.findAll({
        where: { estado: false }
        //attributes: ['id', ['description', 'descripcion']]
      }).then((resp) => {
        res.status(200).json(resp);
      });     
  }}

export default papeletaInt