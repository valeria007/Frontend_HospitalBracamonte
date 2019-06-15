import model from '../models';

const { Internaciones } = model;

class Intern { 
    static Internacion(req,res){
        const { historial,fechaIngreso,tipoPaciente,institucion,provieneDE,observacion,especialidad,sala,cama,doctor,diagnostico } = req.body 
        const { IDsala } = req.params
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
            diagnostico
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
 }

export default Intern