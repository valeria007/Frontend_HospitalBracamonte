import model from '../models';

const { antecedentes } = model

class Antecedentes {
    static reg_antecedente(req,res){
        const { familiares,personales_patologicos,personales_no_patologicos,gineco_obstetrico,descripcion  } = req.body
        const { id_paciente } = req.params
        return antecedentes
        .create({
            familiares,
            personales_patologicos,
            personales_no_patologicos,
            gineco_obstetrico,
            descripcion,
            id_paciente
        })
        .then(data => res.status(201).send({
            success: true,
            data
          }))
    }
    static list_antecedentes(req,res){
        return antecedentes
        .findAll()
        .then(data => res.status(200).json(data))
    }
}

export default Antecedentes;