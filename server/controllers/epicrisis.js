import model from '../models';

const { epicrisis } = model;
const { Pacientes } = model;

class Epicrisis{
    static reg_epicrisis(req,res){
        const { historial,Fecha_internacion,Fecha_alta,
          datos_clinicos,diagnostico_admicion,diagnostico_egreso,
          condicion_egreso,causa_egreso,examenes_complementario,
          tratamiento_quirurgico,tratamiento_medico,complicaciones,
          pronostico_vital,pronostico_funcional,control_tratamiento,
          recomendaciones,id_medico
        } = req.body;
        const { id_internacion } = req.params;

        if( historial == "" || isNaN(historial) || Fecha_internacion == "" || Fecha_alta == "" || id_medico == "" || condicion_egreso == "" || causa_egreso == ""){
          if(historial == ""){
            res.status(400).json({
              success:false,
              msg:"Historail no se esta mandando"
            })
          }else if (isNaN(historial)){
            res.status(400).json({
              success:false,
              msg:"Historial solo puede contener numeros"
            })
          }else if (Fecha_internacion == ""){
            res.status(400).json({
              success:false,
              msg:"Fecha internacion es obligatorio"
            })
          }else if (Fecha_alta == ""){
            res.status(400).json({
              success:false,
              msg:"Fecha de alta es obligatorio"
            })
          }else if (id_medico == ""){
            res.status(400).json({
              success:false,
              msg:"Identificador del medico no se esta mandando"
            })
          }else if (condicion_egreso == ""){
            res.status(400).json({
              success:false,
              msg:"Condicion de egreso es obligatorio"
            })
          }else if (causa_egreso == ""){
            res.status(400).json({
              success:false,
              msg:"Causa de egreso"
            })
          }
        }else{

          return epicrisis                
          .findAll({
            where:{ id_internacion : id_internacion }
          })
          .then(resp => {
            if (resp != ""){
              res.status(400).json({
                success:false,
                msg:"Ya se registro el alta de este paciente"
              })
            }else{
              return Pacientes                
              .findAll({
                where:{ numeroHistorial : historial }
              })
              .then(data => {
                if(data == ""){
                  res.status(400).json({
                    success:false,
                    msg:"Ese paciente no esta registrado"
                  })
                }else {
                  
                  return epicrisis
                  .create({
                      historial,
                      Fecha_internacion,
                      Fecha_alta,
          
                      datos_clinicos,
                      diagnostico_admicion,
                      diagnostico_egreso,
          
                      condicion_egreso,
                      causa_egreso,
                      examenes_complementario,
          
                      tratamiento_quirurgico,
                      tratamiento_medico,
                      complicaciones,
          
                      pronostico_vital,
                      pronostico_funcional,
                      control_tratamiento,
          
                      recomendaciones,
                      id_internacion,
                      id_medico
                  })
                  .then(data => res.status(200).send({
                      success: true,
                      msg: "Se insertaron los datos",
                      data
                  })) 
                }
              });
            }
          })
        }           
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
                success: true,
                message: 'Se Modifico',
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

    // ruta para poder borrar epicrisis
    static deleteEpicrisis(req, res) {
      return epicrisis
        .findByPk(req.params.id)
        .then(data => {
          if(!data) {
            return res.status(400).send({
            message: 'Book Not Found',
            });
          }
          return data
            .destroy()
            .then(() => res.status(200).send({
              message: 'Successfully deleted'
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
}

export default Epicrisis