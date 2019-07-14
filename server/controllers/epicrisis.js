import model from '../models';

const { epicrisis } = model;
class Epicrisis{
    static reg_epicrisis(req,res){
        const { historial,Fecha_internacion,Fecha_alta,diagnostico_ingreso,resumenExmen_clinico,resumen_evolucion,medicamentos_usados,diagnosticoPos_operatorio,intervenciones_quirurgicas,resAnatomia_patologica,resAllasgos_lab,diagnostico_final,estadoPaciente_alta,result_autopcia } = req.body;
        const { id_internacion } = req.params;
        return epicrisis
        .create({
            historial,
            Fecha_internacion,
            Fecha_alta,
            diagnostico_ingreso,
            resumenExmen_clinico,
            resumen_evolucion,
            medicamentos_usados,
            diagnosticoPos_operatorio,
            intervenciones_quirurgicas,
            resAnatomia_patologica,
            resAllasgos_lab,
            diagnostico_final,
            estadoPaciente_alta,
            result_autopcia,
            id_internacion
        })
        .then(data => res.status(200).send({
            success: true,
            message: "Exito",
            data
        }))    
    }
     // Servicio para para mostrar emergencias
     static getEpicrisis(req, res) {
        return epicrisis                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }
    //este servico es para mostrar las epicrisis del paciente segun el id de la internacion
    static Epicrisis_intenracion(req, res){                
       const { id_internacion } = req.params
       epicrisis.findAll({
           where: {id_internacion: id_internacion}
        }).then((data) => {
          res.status(200).json(data);
        });     
    }

    //ruta para poder actulizar en la tabla epicrisis
    static updateEpicrisis(req, res) {
        const { Fecha_internacion,Fecha_alta,diagnostico_ingreso,resumenExmen_clinico,resumen_evolucion,medicamentos_usados,diagnosticoPos_operatorio,intervenciones_quirurgicas,resAnatomia_patologica,resAllasgos_lab,diagnostico_final,estadoPaciente_alta,result_autopcia } = req.body
        return epicrisis
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                Fecha_internacion: Fecha_internacion || data.Fecha_internacion,
                Fecha_alta: Fecha_alta || data.Fecha_alta,  
                diagnostico_ingreso: diagnostico_ingreso || data.diagnostico_ingreso,  
                resumenExmen_clinico: resumenExmen_clinico || data.resumenExmen_clinico,  
                resumen_evolucion: resumen_evolucion || data.resumen_evolucion,  
                medicamentos_usados: medicamentos_usados || data.medicamentos_usados,  
                diagnosticoPos_operatorio: diagnosticoPos_operatorio || data.diagnosticoPos_operatorio,  
                intervenciones_quirurgicas: intervenciones_quirurgicas || data.intervenciones_quirurgicas, 
                resAnatomia_patologica: resAnatomia_patologica || data.resAnatomia_patologica, 
                resAllasgos_lab: resAllasgos_lab || data.resAllasgos_lab ,
                diagnostico_final: diagnostico_final || data.diagnostico_final ,
                estadoPaciente_alta: estadoPaciente_alta || data.estadoPaciente_alta ,
                result_autopcia: result_autopcia || data.result_autopcia 
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {                  
                    Fecha_internacion: Fecha_internacion || update.Fecha_internacion,
                    Fecha_alta: Fecha_alta || update.Fecha_alta,  
                    diagnostico_ingreso: diagnostico_ingreso || update.diagnostico_ingreso,  
                    resumenExmen_clinico: resumenExmen_clinico || update.resumenExmen_clinico,  
                    resumen_evolucion: resumen_evolucion || update.resumen_evolucion,  
                    medicamentos_usados: medicamentos_usados || update.medicamentos_usados,  
                    diagnosticoPos_operatorio: diagnosticoPos_operatorio || update.diagnosticoPos_operatorio,  
                    intervenciones_quirurgicas: intervenciones_quirurgicas || update.intervenciones_quirurgicas, 
                    resAnatomia_patologica: resAnatomia_patologica || update.resAnatomia_patologica, 
                    resAllasgos_lab: resAllasgos_lab || update.resAllasgos_lab ,
                    diagnostico_final: diagnostico_final || update.diagnostico_final ,
                    estadoPaciente_alta: estadoPaciente_alta || update.estadoPaciente_alta ,
                    result_autopcia: result_autopcia || update.result_autopcia 
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
}

export default Epicrisis