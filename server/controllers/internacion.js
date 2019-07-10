import model from '../models';

const { Internaciones } = model;

const { Camas } = model;
const { Salas } = model;

class Intern { 
    static Internacion(req,res){
        const { historial,fechaIngreso,tipoPaciente,institucion,provieneDE,observacion,especialidad,sala,cama,doctor,diagnostico } = req.body 
        const { idCama } = req.params
        const { idPinternacion } = req.params
        return Internaciones
        .create({
            historial,
            fechaIngreso,
            tipoPaciente,
            institucion,
            provieneDE,
            observacion,
            especialidad,
            sala,
            cama,
            doctor,
            diagnostico,
            idCama,
            idPinternacion
        })
        .then(data => res.status(200).send({
            success: true,
            message: "Internacion",
            data
        }))
    }
    // Servicio para para mostrar Internaciones
    static listInternaciones(req, res) {
        return Internaciones                
        .findAll()
        .then(data => res.status(200).send(data));                       
    } 


    //ruta para poder sacar una form internacion segun p internacion

    static One_form_Internacion(req, res){                
        const { id_Pinternacion } = req.params
        Internaciones.findAll({
           where: {idPinternacion: id_Pinternacion},
           //attributes: ['id', ['description', 'descripcion']]
           include:[
            { model: Camas, attributes:['id','numeroCama'],
           include:[
             {model:Salas, attributes:['id','descripcionSala']}
           ] }
          ]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }

    //esto elimina for internacion
    static delete_internacion(req, res) {
        const { id } = req.params
        return Internaciones
          .findByPk(id)
          .then(Internaciones => {
            if(!Internaciones) {
              return res.status(400).send({
              message: 'NO hay nada que eliminar',
              });
            }
            return Internaciones
              .destroy()
              .then(() => res.status(200).send({
                message: 'Se elimino con exito'
              }))
              .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }

    static list_internacion_paciente(req, res){                
      const { id_Pinternacion, historial } = req.params
      Internaciones.findAll({
         where: {idPinternacion: id_Pinternacion, historial: historial},
         //attributes: ['id', ['description', 'descripcion']]
         include:[
           { model: Camas, attributes:['id','numeroCama'],
          include:[
            {model:Salas, attributes:['id','descripcionSala']}
          ] }
         ]
       }).then((data) => {
         res.status(200).json(data);
       });     
    }

    //actualizar form  internacio
    static update_form_internacion(req, res) {
      var idCama = req.body.cama
      const { historial,fechaIngreso,tipoPaciente,institucion,provieneDE,observacion,especialidad,sala,cama,doctor,diagnostico } = req.body
      return Internaciones
        .findByPk(req.params.id)
        .then((data) => { 
          data.update({
            historial: historial || data.historial,
            fechaIngreso: fechaIngreso || data.fechaIngreso,  
            tipoPaciente: tipoPaciente || data.tipoPaciente,  
            institucion: institucion || data.institucion,                    
            provieneDE: provieneDE || data.provieneDE,
            observacion: observacion || data.observacion,
            especialidad: especialidad || data.especialidad, 
            sala: sala || data.sala,
            cama: cama || data.cama,
            doctor: doctor || data.doctor,
            diagnostico: diagnostico || data.diagnostico,
            idCama: idCama || data.idCama     
          })
          .then(update => {
            res.status(200).send({              
              message: 'Actualizado',
              data: {
                historial: historial || update.historial,
                fechaIngreso: fechaIngreso || update.fechaIngreso,  
                tipoPaciente: tipoPaciente || update.tipoPaciente,  
                institucion: institucion || update.institucion,                    
                provieneDE: provieneDE || update.provieneDE,
                observacion: observacion || update.observacion,
                especialidad: especialidad || update.especialidad, 
                sala: sala || update.sala,
                cama: cama || update.cama,
                doctor: doctor || update.doctor,
                diagnostico: diagnostico || update.diagnostico,
                idCama: idCama || update.idCama       
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static One_Internacion(req, res){                
      const { id } = req.params
      Internaciones.findAll({
         where: {id: id},
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
  }
 }

export default Intern