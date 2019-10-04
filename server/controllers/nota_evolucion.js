import model from '../models';

const { nota_evolucion_Paciente } = model;
const { Internaciones } = model;

class NotaEvolucion{
    static reg_notaEvolucion(req,res){
        const { historial,fecha, nota_evolucion, id_medico } = req.body;
        const { id_internacion } = req.params;

        return Internaciones                
        .findAll({
            where : { id : id_internacion }
        })
        .then(data => {
            console.log(data, "   <<<<<<<<<<<<<<<<<<<<<<<<<<<   esto quiero <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            if( data == "" ){
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
                    if( historial == "" || isNaN(historial) || fecha == "" || nota_evolucion == "" || id_medico == ""){
                        if(historial == ""){
                            res.status(400).json({
                                success:false,
                                msg: " Historial no se esta mandando "
                            })
                        }else if (isNaN(historial)){
                            res.status(400).json({
                                success:false,
                                msg: " Historial no puede contener letras "
                            })
                        }else if (fecha == ""){
                            res.status(400).json({
                                success:false,
                                msg: " Fecha es obligatorio "
                            })
                        }else if (nota_evolucion == ""){
                            res.status(400).json({
                                success:false,
                                msg: " Inserte nota de evolucion "
                            })
                        }else if(id_medico == ""){
                            res.status(400).json({
                                success:false,
                                msg: " No se esta insertando el idetificador del medico "
                            })
                        }
                    }else{
                        
                        return nota_evolucion_Paciente 
                        .create({
                            historial,
                            fecha, 
                            nota_evolucion,
                            id_internacion,
                            id_medico
                        })
                        .then(data => res.status(200).send({
                            success: true,
                            msg: "Exito",
                            data
                        })) 
                        .catch(error => {
                            res.status(500).json({
                                success:false,
                                msg:"500",
                                error
                                
                            })
                        })
            
                    }
                }
            }
           
        });        
       
        
    } 
    static notaEvolucion(req, res) {
        return nota_evolucion_Paciente                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }

    //Esta ruta muestra las notas de evolucion del paciente
    static list_notaEvolucion(req, res){                
        const { id_internacion } = req.params
        nota_evolucion_Paciente.findAll({
            where: { id_internacion: id_internacion }
         }).then((data) => {
           res.status(200).json(data);
         });     
     }

    static One_notaEvolucion(req, res){                
        const { id_nota } = req.params
        nota_evolucion_Paciente.findAll({
            where: { id: id_nota }
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
}
export default NotaEvolucion