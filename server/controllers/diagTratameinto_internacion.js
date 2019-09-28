import model from '../models';
import { hostname } from 'os';

const { diagnostico_tratamientos } = model
const { Internaciones } = model;

class Diag_tratameinto{
    static reg_diagTratameinto(req,res){
        const { historial,fecha,evolucion,medicamentos,estudios,id_medico } = req.body
        const { id_internacion } = req.params; 
        return Internaciones                
        .findAll({
            where : { id : id_internacion }
        })
        .then(data => {
            if ( data == "" ){
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
                    if(historial == "" || isNaN(historial) || fecha == "" || evolucion == "" || medicamentos == "" || id_medico == ""){
                        if(historial == ""){
                            res.status(400).json({
                                success:false,
                                msg:"Histoiral no puede estar vacio"
                            })
                        }else if (isNaN(historial)){
                            res.status(400).json({
                                success:false,
                                msg:"Historial no puede contener numeros"
                            })
                        }else if (evolucion == ""){
                            res.status(400).json({
                                success:false,
                                msg:"Evolucion no puede esta vacio"
                            })
                        }else if (medicamentos == ""){
                            res.status(400).json({
                                success:false,
                                msg:"Inserte medicamentos"
                            })
                        }else if (fecha == ""){
                            res.status(400).json({
                                success:false,
                                msg:"Inserte fecha por favor"
                            })
                        }else if (id_medico == ""){
                            res.status(400).json({
                                success:false,
                                msg: " No se esta insertando el idetificador del medico "
                            })
                        }
                    }else{  
                        return diagnostico_tratamientos 
                        .create({
                            historial,
                            fecha,
                            evolucion,
            
                            medicamentos,
                            estudios,
                            id_internacion,
                            id_medico
                        })
                        .then(data => res.status(200).send({
                            success: true,
                            msg: "Se insertaron los datos",
                            data
                        }))
                        .catch(error => {
                            res.status(500).json({
                                success:false,
                                error
                            })
                        })
            
                    }
                }
            }
        })
       
        
    }
    static diagTratamiento(req, res) {
        return diagnostico_tratamientos                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }

    //Esta ruta muestra las notas de evolucion del paciente
    static list_DiagnosticoTratameinto(req, res){                
        const { id_internacion } = req.params
        diagnostico_tratamientos.findAll({
            where: { id_internacion: id_internacion }
        }).then((data) => {
          res.status(200).json(data);
        });     
    }

    static One_DiagTratamiento(req, res){                
        const { id } = req.params
        diagnostico_tratamientos.findAll({
            where: { id: id }
        }).then((data) => {
          res.status(200).json(data);
        });     
    }
}

export default Diag_tratameinto