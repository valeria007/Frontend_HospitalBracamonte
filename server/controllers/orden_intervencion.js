import model from '../models';

const { orden_Intervencion } = model;
const { Internaciones } = model;

class OrdenIntervencion{
    static reg_OrdenIntervencion(req,res){
        const { historial,fechaOrden,nombre_cirujano,ayudantes, diag_pre_operatorio, intr_parcticada,diag_pos_operatorio,id_medico } = req.body;
        const { id_internacion } = req.params;

        return Internaciones                
        .findAll({
            where : { id : id_internacion }
        })
        .then(data => {
            if (data == ""){
                res.status(400).json({
                    success:false,
                    msg:"No se puede registrar"
                })
            }else{
                if(data[0].estado_alta == true ){
                    res.status(400).json({
                        success : false,
                        msg : "No se pude registrar, por que el paciente ya fue dado de alta"
                    })
                }else{
                    if( historial == "" || isNaN(historial) || fechaOrden == "" || nombre_cirujano == "" || ayudantes == "" || diag_pre_operatorio == "" || intr_parcticada =="" || diag_pos_operatorio == "" || id_medico == "" || isNaN(id_medico) ){
                        if( historial == "" ){
                            res.status(400).json({
                                success:false,
                                msg: "Historial del paciente no se esta mandando"
                            })
                        }else if(isNaN(historial)){
                            res.status(400).json({
                                success:false,
                                msg: "historial solo puede contener nuemros"
                            })
                        }else if (nombre_cirujano == ""){
                            res.status(400).json({
                                success:false,
                                msg: "Por favor inserte nombre del cirujano"
                            })
                        }else if (ayudantes == ""){
                            res.status(400).json({
                                success:false,
                                msg: "Inserte nombre de los ayudantes"
                            })
                        }else if (diag_pre_operatorio == "" || intr_parcticada == "" || diag_pos_operatorio== ""){
                            res.status(400).json({
                                success:false,
                                msg: "Los campos diagnostico pre operatorio, intervenciones practicadas y orden post operatorio son obligatorios"
                            })
                        }else if (id_medico == "" || isNaN(id_medico)){
                            res.status(400).json({
                                success:false,
                                msg: "La indetidad del medico no se esta mandando o se esta mandando mal"
                            })
                        }else if (fechaOrden == ""){
                            res.status(400).json({
                                success:false,
                                msg: "Inserte fecha por favor"
                            })
                        }
                    }else{
                        
                        return orden_Intervencion
                        .create({
                            historial,
                            fechaOrden,
                            nombre_cirujano,
                            ayudantes,
                            diag_pre_operatorio,
                            intr_parcticada,
                            diag_pos_operatorio,
                            id_internacion,
                            id_medico
                        })
                        .then(data => res.status(200).send({
                            success: true,
                            msg: "Se insertaron los datos",
                            data
                        }))
                    }  
                }
            }
        })
         
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
