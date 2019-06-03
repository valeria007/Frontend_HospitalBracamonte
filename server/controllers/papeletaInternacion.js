import model from '../models';

const { PapeletaInternacion } = model;

class papeletaInt{
    static enviarPapeletaINT(req, res){
          const { tipoConsulta,fechaIngreso, Historial, nombre,apellido1,apellido2,sexo,edad,nombreDoctor,apellidoD1,apellidoD2,diagnostico } = req.body
          const { idConsultaMedica } = req.params
          const { idEmergencia } = req.params
          return PapeletaInternacion
          .create({
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
}

export default papeletaInt