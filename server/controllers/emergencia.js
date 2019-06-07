import model from '../models';

const { emergencia } = model;

class Emergencias {
    static Emergencia(req, res){
        const { tipoAtencion, Nhistorial,nombreDoctor,apellidoD1,apellidoD2,motivoConsulta,diagnostico,tratamiento,observaciones } = req.body
        const  { idCita }  = req.params
        return emergencia
        .create({
            tipoAtencion,
            Nhistorial,
            nombreDoctor,
            apellidoD1,
            apellidoD2,
            motivoConsulta,
            diagnostico,
            tratamiento,
            observaciones,
            idCita            
        })
        .then(data => res.status(200).send({
            success: true,
            message: "se introdujo una cama",
            data
        }))        
    }
    // Servicio para para mostrar todas las camas
    static getEmergencia(req, res) {
        return emergencia                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }
}

export default Emergencias