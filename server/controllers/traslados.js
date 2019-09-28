import model from '../models';

const { traslados } = model;
const { Pacientes } = model;


class Traslados {
    static create_traslado(req,res){
        const { historial,nombre_doctor,fecha_hora,enviado_de, operaciones,diagnostico_principal,otros_diagnosticos,causa_externa,id_internacio,id_medico,id_especialidad } = req.body   
        
        const { id_paleta_internacion } = req.params

        if (historial == "" || isNaN(historial) || nombre_doctor == "" || fecha_hora == "" || enviado_de == "" || diagnostico_principal == "" || id_internacio == "" || id_medico == "" || id_especialidad == ""){
            if(historial == "" || isNaN(historial)){
                res.status(400).json({
                    success: false,
                    msg:"historial no se esta mandando o se esta mandando mal"
                })
            }else if (fecha_hora == ""){
                res.status(400).json({
                    success: false,
                    msg:"Fecha y hora no es obligatorio"
                })
            }else if (enviado_de == ""){
                res.status(400).json({
                    success: false,
                    msg:"No se esta enviando enviado de"
                })
            }else if (id_medico == ""){
                res.status(400).json({
                    success: false,
                    msg:"No se esta enviando el identificador del medico"
                })
            }else if (id_internacio == ""){
                res.status(400).json({
                    success: false,
                    msg:"No se esta enviando el identificador de internacion"
                })
            }else if (id_especialidad == ""){
                res.status(400).json({
                    success: false,
                    msg:"Selecione area de traslado por favor"
                })
            }
        }else{
            return Pacientes                
            .findAll({
                where:{numeroHistorial:historial}
            })
            .then(data => {
                if (data == ""){
                    res.status(400).json({
                        success:false,
                        msg:"El numero de historail que esta mandando no pertenece a ningun paciente"
                    })
                }else{
                    return traslados
                    .create({
                        historial,
                        nombre_doctor,
                        fecha_hora,
                        enviado_de,
                        operaciones,
                        diagnostico_principal,
                        otros_diagnosticos,
                        causa_externa,
                        id_paleta_internacion,
                        id_internacio,
                        id_medico,
                        id_especialidad
                    })
                    .then(data => {
                        res.status(200).json({
                          success: true,
                          msg: "Se registraron los datos",
                          data
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            success:false,
                            msg: "Algo salio mal con el servidor"
                        })
                    });

                }
            });   
        }
       
    }
    static list_traslados(req, res) {
        return traslados                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }
}
export default Traslados
