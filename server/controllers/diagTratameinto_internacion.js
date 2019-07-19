import model from '../models';

const { diagnostico_tratamientos } = model

class Diag_tratameinto{
    static reg_diagTratameinto(req,res){
        const { historial,fecha,sintomas,examenFisico,diagnostico,tratamiento,medicamentos,estudios } = req.body
        const { id_internacion } = req.params;   
        return diagnostico_tratamientos 
        .create({
            historial,
            fecha,
            sintomas,
            examenFisico,
            diagnostico,
            tratamiento,
            medicamentos,
            estudios,
            id_internacion
        })
        .then(data => res.status(200).send({
            success: true,
            message: "Exito",
            data
        }))
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