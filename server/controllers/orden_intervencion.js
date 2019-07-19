import model from '../models';

const { orden_Intervencion } = model;

class OrdenIntervencion{
    static reg_OrdenIntervencion(req,res){
        const { historial,fechaOrden,motivoInternacion,resumneDatosClinicos,examenComplementario,diagnostico,resumenEgreso,tratamientoIndicado,diagnosticoEgreso,planManejoTratamiento,resAutopcia,observacion,condicionEgreso,CausaEgreso } = req.body;
        const { id_internacion } = req.params;
        return orden_Intervencion
        .create({
            historial,
            fechaOrden,
            motivoInternacion,
            resumneDatosClinicos,
            examenComplementario,
            diagnostico,
            resumenEgreso,
            tratamientoIndicado,
            diagnosticoEgreso,
            planManejoTratamiento,
            resAutopcia,
            observacion,
            condicionEgreso,
            CausaEgreso,
            id_internacion
        })
        .then(data => res.status(200).send({
            success: true,
            message: "Exito",
            data
        }))    
    }
    // Servicio para para mostrar Ordenes de internacion
    static getOrdenIntervencion(req, res) {
        return orden_Intervencion                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }

    //este servico es para mostrar las ordenes de interncion del paciente segun el id de la internacion
    static list_Orden_intenrvencion(req, res){                
        const { id_internacion } = req.params
        orden_Intervencion.findAll({
            where: {id_internacion: id_internacion}
        }).then((data) => {
            res.status(200).json(data);
        });     
    }

       //ruta para poder actulizar en la tabla orden de intervencion
       static updateOrdenIntervencion(req, res) {
        const { fechaOrden,motivoInternacion,resumneDatosClinicos,examenComplementario,diagnostico,resumenEgreso,tratamientoIndicado,diagnosticoEgreso,planManejoTratamiento,resAutopcia,observacion,condicionEgreso,CausaEgreso } = req.body
        return orden_Intervencion
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                fechaOrden: fechaOrden || data.fechaOrden,
                motivoInternacion: motivoInternacion || data.motivoInternacion,  
                resumneDatosClinicos: resumneDatosClinicos || data.resumneDatosClinicos,  
                examenComplementario: examenComplementario || data.examenComplementario,  
                diagnostico: diagnostico || data.diagnostico,  
                resumenEgreso: resumenEgreso || data.resumenEgreso,  
                tratamientoIndicado: tratamientoIndicado || data.tratamientoIndicado, 
                diagnosticoEgreso: diagnosticoEgreso || data.diagnosticoEgreso, 
                planManejoTratamiento: planManejoTratamiento || data.planManejoTratamiento, 
                resAutopcia: resAutopcia || data.resAutopcia ,
                observacion: observacion || data.observacion ,
                condicionEgreso: condicionEgreso || data.condicionEgreso ,
                CausaEgreso: CausaEgreso || data.CausaEgreso 
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {                  
                    fechaOrden: fechaOrden || update.fechaOrden,
                    motivoInternacion: motivoInternacion || update.motivoInternacion,  
                    resumneDatosClinicos: resumneDatosClinicos || update.resumneDatosClinicos,  
                    examenComplementario: examenComplementario || update.examenComplementario,  
                    diagnostico: diagnostico || update.diagnostico,  
                    resumenEgreso: resumenEgreso || update.resumenEgreso,  
                    tratamientoIndicado: tratamientoIndicado || update.tratamientoIndicado, 
                    diagnosticoEgreso: diagnosticoEgreso || update.diagnosticoEgreso, 
                    planManejoTratamiento: planManejoTratamiento || update.planManejoTratamiento, 
                    resAutopcia: resAutopcia || update.resAutopcia ,
                    observacion: observacion || update.observacion ,
                    condicionEgreso: condicionEgreso || update.condicionEgreso ,
                    CausaEgreso: CausaEgreso || update.CausaEgreso 
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }

    //ruta para poder mostrar una orden de onternacion
    static One_Orden_intenrvencion(req, res){                
        const { id } = req.params
        orden_Intervencion.findAll({
            where: {id: id}
        }).then((data) => {
            res.status(200).json(data);
        });     
    }


 
}

export default OrdenIntervencion
