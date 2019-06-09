import model from '../models';

const { emergencia } = model;

class Emergencias {
    static Emergencia(req, res){
        const { fechaAtencion, Nhistorial,nombreDoctor,apellidoD1,apellidoD2,motivoConsulta,diagnostico,tratamiento,observaciones,idDoctor,idEnfermera } = req.body
        const  { idCita }  = req.params
        return emergencia
        .create({
            fechaAtencion,
            Nhistorial,
            nombreDoctor,
            apellidoD1,
            apellidoD2,
            motivoConsulta,
            diagnostico,
            tratamiento,
            observaciones,
            idCita,
            idDoctor,
            idEnfermera            
        })
        .then(data => res.status(200).send({
            success: true,
            message: "se introdujo una cama",
            data
        }))        
    }
    // Servicio para para mostrar emergencias
    static getEmergencia(req, res) {
        return emergencia                
        .findAll()
        .then(data => res.status(200).send(data));                       
    }
    //serv para mostrar emergencia segun id de cita
    static onlyEmergencia(req, res){                
        var id = req.params.id;  
        emergencia.findAll({
           where: {idCita: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
        }
}

export default Emergencias