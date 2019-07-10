import model from '../models';

const { examen_fisico } = model;

class Examen_Fisico{
    static reg_examen_fisico(req,res){
        const { estado_general,facies,precion_arterial,estado_nutricional,peso,frecuencia_cardiaca,saturacion_oxigeno,fecha_revision } = req.body;
        const { id_paciente } = req.params; 
        return examen_fisico
        .create({
            estado_general,
            facies,
            precion_arterial,
            estado_nutricional,
            peso,
            frecuencia_cardiaca,
            saturacion_oxigeno,
            fecha_revision,
            id_paciente 
        })
        .then(data => res.status(201).json({
            success: true,
            message: " Registrado ",
            data
        }))
    }
    static list_tesponsable(req,res){
        return examen_fisico
        .findAll()
        .then(data => res.status(200).json(data))
    }
}